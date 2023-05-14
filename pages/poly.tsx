import type { NextPage } from "next";
import Container from "../components/Container";

const Poly: NextPage = () => {
  
  async function changeGlobal() {

  }
  return (
    <Container title="Poly">
      <div>Polygonnnnne</div>

      <div><button onClick={changeGlobal}>BOTAO PARA MUDAR</button></div>
    </Container>
  );
};

export default Poly;
