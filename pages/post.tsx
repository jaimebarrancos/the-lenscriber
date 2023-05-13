import type { NextPage } from "next";
import Container from "../components/Container";
//import {client, challenge, authenticate, postRequest} from "../api"
import {ethers} from "ethers"

const Post: NextPage = () => {

  const Post = async () => {


    // const publications = await client.query({
    //   query: publicationsByUser,
    //   variables: { profileId: "0x01" }
    // })



  }
  return (
    <Container title="Post">
      <div>posting page</div>
    </Container>
  );
};

export default Post;
