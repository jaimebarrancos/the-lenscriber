import { FooterContainer } from "./Footer.styles";
import { FooterContainerV } from "./FooterV.styles";

export default function Footer() {
  let x = false
  
  return(
      <div>
      {!x ? (
   <FooterContainer>NON verified account</FooterContainer>
      ) : (
  <FooterContainerV>Verified account</FooterContainerV>      )}
    </div>)

}