import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { apolloClient } from '../apollo-client';
import { login } from '../login';
import { explicitStart, PROFILE_ID } from '../config';
import { uploadIpfs } from '../ipfs';
import type { NextPage } from "next";
import Container from "../components/Container";
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'

import {
  client, challenge, authenticate, getDefaultProfile,
  signCreatePostTypedData, splitSignature, validateMetadata,
  getProfiles
} from '../api'

const projectId = "2PkzI0wyR3M08EkxAlr4jMXxDZ1"
const projectSecret = "ee305476603c7936b7ec8bf995a55f59"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

import LENS_HUB_ABI from '../ABI.json'

export const LENS_HUB_CONTRACT = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"


const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
})

const Post: NextPage = () => {
  const [address, setAddress] = useState()
  const [session, setSession] = useState(null)
  const [postData, setPostData] = useState('')
  const [profileId, setProfileId] = useState('')
  const [handle, setHandle] = useState('')
  
  async function createPost() {
    if (!postData) return
    const ipfsData = await uploadToIPFS()
    console.log('ipfsData: ', ipfsData)

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

    const profileData = await client.query({
      query: getProfiles,
      variables: {
        address: accounts[0]
      }
    })

    console.log({ profileData})

    const profileId = profileData.data.profiles.items[0].id

    const createPostRequest = {
      profileId,
      contentURI: 'ipfs://' + ipfsData.path,
      collectModule: {
        freeCollectModule: { followerOnly: true }
      },
      referenceModule: {
        followerOnlyReferenceModule: false
      },
    }

    const token = localStorage.getItem('lens-token')
    console.log('token: ', token)

    console.log('createPostRequest: ', createPostRequest)
    try {
      const signedResult = await signCreatePostTypedData(createPostRequest, token)
      const typedData = signedResult.result.typedData
      const { v, r, s } = splitSignature(signedResult.signature)

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer)

      const tx = await lensHub.postWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })


      console.log('successfully created post: tx hash', tx.hash)
    } catch (err) {
      console.log('error posting publication: ', err)
    }
  }
  async function uploadToIPFS() {
    const metaData = {
      version: '2.0.0',
      content: postData,
      description: postData,
      name: `Post by @${handle}`,
      external_url: `https://lenster.xyz/u/${handle}`,
      metadata_id: uuidv4(),
      mainContentFocus: 'TEXT_ONLY',
      attributes: [],
      locale: 'en-US',
    }

    const result = await client.query({
      query: validateMetadata,
      variables: {
        metadatav2: metaData
      }
    })
    console.log('Metadata verification request: ', result)
      
    const added = await ipfsClient.add(JSON.stringify(metaData))
    return added
  }

  function onChange(e) {
    setPostData(e.target.value)
  }
  return(
    <Container title="Post">
      <div style={{display: "grid", gridTemplateRows: "4em 20em 5em", justifyItems: "center"}}>
      <div>Post your blog!</div>
      
      <textarea
      style={{width: "22em", height:"18m", borderWidth: "0.4em"}}
        onChange={onChange}
      />

      <button style={{width: "8em", height:"5em" }} onClick={createPost}>Create Post</button>
      </div>
    </Container>
  );
};

export default Post;
