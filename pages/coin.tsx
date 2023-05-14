import type { NextPage } from "next";
import Container from "../components/Container";
import type { ISuccessResult } from "@worldcoin/idkit";
import { IDKitWidget } from "@worldcoin/idkit";
import axios from "axios";
import {ethers} from "ethers"
import db from "../utils/db";
import cookies from "next-cookies";
import useAuth from "../hooks/useAuth";

const action = "login_action";
const signal = "my_signal";


const Coin: NextPage = () => {
  const { setLoggedIn, isLoggedIn } = useAuth();
  console.log({ isLoggedIn, setLoggedIn });
  const accounts = async() => await window.ethereum.request({ method: 'eth_requestAccounts' })

const onSuccess = async (result: ISuccessResult) => {
  console.log("sending: ", { action, signal, ...result });
  const res = await axios.post("/api/login", {
    action,
    signal,
    ...result,
    accounts
  });
  setLoggedIn(res.data === "Logged In");
  console.log(res.data === "Logged in", res.data);
  // do some logic to mark as logged in
};

  return (
    <Container title="Coin">
      <div>Orders</div>
      <IDKitWidget
        action="login_action"
        signal="my_signal"
        onSuccess={onSuccess}
        app_id="app_292d8587b41c6d6e97edb33aca080e3e"
        // walletConnectProjectId="get_this_from_walletconnect_portal"
      >
        {({ open }) => <button onClick={open}>
          {!accounts ? "Connect Wallet First" : "Verify with Worldcoin"}
        </button>}
      </IDKitWidget>
    </Container>
  );
};

export default Coin;

