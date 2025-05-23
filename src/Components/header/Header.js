import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import Menu from "../menu/Menu";
import headerStyles from "./header.module.css";

export default function Header({onClick}) {
    return (
        <header className={headerStyles.header}>
            <Logo width="50" height="50" />
            <Menu onClick={onClick}/>
        </header>
    )
}