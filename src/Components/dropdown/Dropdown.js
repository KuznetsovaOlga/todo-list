import {NavLink} from "react-router-dom";
import dropdownStyle from "./dropdown.module.css";

export default function Dropdown({onClick}) {
    return (
        <div className={dropdownStyle.container}>
            <div className={dropdownStyle.sideBlock}>
                <nav className={dropdownStyle.block}>
                    <NavLink to="/opened" className={dropdownStyle.blockItem} onClick={onClick}>Открытые задачи</NavLink>
                    <NavLink to="/finished" className={dropdownStyle.blockItem}>Завершенные задачи</NavLink>
                    <NavLink to="/createTask" className={dropdownStyle.blockItem}>Добавить задачи +</NavLink>
                </nav>
            </div>
        </div>
    )
}