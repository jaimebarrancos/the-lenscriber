import { SidebarContainer } from "./Sidebar.styles";
import { MENU_ITEMS } from "../../constants/menu-items";
import MenuItemsList from "../MenuItemsList";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type SidebarProps = {
  isOpened: boolean;
};
export default function Sidebar({ isOpened }: SidebarProps) {
  const [isExpanded, toggleExpanded] = useState(false);

  const router = useRouter();
  const selected = router.asPath === "http://localhost:3000/customers";
  return (
    <SidebarContainer isOpened={isOpened}>
      <MenuItemsList options={MENU_ITEMS} />
      
    </SidebarContainer>
  );
}
