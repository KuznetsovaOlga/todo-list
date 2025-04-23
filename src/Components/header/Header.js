import { ReactComponent as Logo } from "../../assets/logo.svg";
import Menu from "../menu/Menu";
import headerStyles from "./header.module.css";

export default function Header() {
    return (
        <header className={headerStyles.header}>
            <Logo width="50" height="50" />
            <Menu/>
        </header>
    )
}