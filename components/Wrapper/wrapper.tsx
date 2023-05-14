import { useRouter } from "next/router";
import { useState } from "react";


export default function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {

  const [verifiedHuman, setVerifiedHuman] = useState(false);
  
  return (
    <div>hey</div>
  );
}