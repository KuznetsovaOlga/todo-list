import menuStyle from "./menu.module.css"

export default function Menu() {
    return (
        <ul className={menuStyle.list}>
            <li className={menuStyle.item}>Главная</li>
            <li className={menuStyle.item}>Новости</li>
            <li className={menuStyle.item}>Погода</li>
        </ul>
    )
}