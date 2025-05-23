import {useContext} from "react";
import {TasksContext} from "../../MainApp";
import {NavLink, Outlet} from "react-router-dom";
import dropdownStyle from "./dropdown.module.css";

export default function OpenedTasks() {
    const {isShowSecondBar} = useContext(TasksContext)

    return (
        <main className={dropdownStyle.main}>
            <div className={dropdownStyle.containerBlock}>
                {isShowSecondBar && <nav className={dropdownStyle.block}>
                    <NavLink
                        className={dropdownStyle.blockItem}
                        key={0}
                        to={`time_is_up`}
                    >
                        Оставшиеся задачи
                    </NavLink>
                    <NavLink
                        className={dropdownStyle.blockItem}
                        key={1}
                        to={`there_is_time`}
                    >
                        Просроченные задачи
                    </NavLink>
                </nav>}
                <Outlet/>
            </div>
        </main>
    )
}