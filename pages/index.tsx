import type { NextPage } from "next";
import Container from "../components/Container";
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {client, challenge, authenticate, publicationsByUser} from "../api"
import {ethers} from "ethers"

const options = {
  injectProvider: false,
}

declare global {
  interface Window {
    ethereum: any
  }
}

const Home: NextPage = () => {
  const [PostText, setPostText] = useState("")

   useEffect(() => {
    setPostText(PostText)
   },[PostText])

  const signIn = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log('accounts: ', accounts)

//     /***********************************/
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const challengeInfo = await client.query({
      query: challenge,
      variables: { address:accounts[0] }
    })

    /* ask the user to sign a message with the challenge info returned from the server */
    const signature = await signer.signMessage(challengeInfo.data.challenge.text)

    const authData = await client.mutate({
      mutation: authenticate,
      variables: {
        address:accounts[0], signature
      }
    })
    /* if user authentication is successful, you will receive an accessToken and refreshToken */
    const { data: { authenticate: { accessToken }}} = authData
    console.log({ accessToken })
    localStorage.setItem('lens-token', accessToken)
  }
  const getPost = async () => {
    const publications = await client.query({
      query: publicationsByUser,
      variables: { profileId: "0x01" }
    })

console.log(publications)
    setPostText(publications.toString())

  }
  
  return (
    <Container title="Dashboard">
        dashboard
        <button onClick={signIn}>sign in</button>
        <button onClick={getPost}>GET POST</button>


        <text>{PostText}</text>

    </Container>
  );
};

export default Home;
