import type { NextPage } from "next";
import Container from "../components/Container";
import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";



const Coin: NextPage = () => {
  const onSuccess = (result: ISuccessResult) => {
    console.log(result); // + action + signal
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
        {({ open }) => <button onClick={open}>Sign in with World Id</button>}
      </IDKitWidget>
    </Container>
  );
};

export default Coin;

