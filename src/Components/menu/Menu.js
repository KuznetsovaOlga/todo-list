import menuStyle from "./menu.module.css"
import commonStyle from "../../assets/styles/commonStyles.module.css";
import {NavLink} from "react-router-dom";

export default function Menu({onClick}) {
    return (
        <ul className={commonStyle.common_list}>
            <NavLink to="/" className={menuStyle.item} >Главная</NavLink>
            <li className={menuStyle.item} onClick={onClick}>Задачи</li>
            <li className={menuStyle.item}>Новости</li>
            <li className={menuStyle.item}>Погода</li>
        </ul>
    )
}