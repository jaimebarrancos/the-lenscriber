import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider/AuthProvider";

export default function useAuth() {
  return useContext(AuthContext);
}