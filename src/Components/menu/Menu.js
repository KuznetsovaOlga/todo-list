import menuStyle from "./menu.module.css"
import commonStyle from "../../assets/styles/commonStyles.module.css";

export default function Menu() {
    return (
        <ul className={commonStyle.common_list}>
            <li className={menuStyle.item}>Главная</li>
            <li className={menuStyle.item}>Новости</li>
            <li className={menuStyle.item}>Погода</li>
        </ul>
    )
}