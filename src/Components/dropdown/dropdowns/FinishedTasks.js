import {useContext} from "react";
import {TasksContext} from "../../../MainApp";
import dropdownStyles from "../dropdown.module.css";


export default function FinishedTasks() {
    const {listTasks} = useContext(TasksContext)

    return (
        <div className={dropdownStyles.wrapp}>
            <h1>Завершенные задачи</h1>
            <ul>
                {listTasks.map((task, index) => {
                    if (!task.isOpened) return (<li key={task.id}>{task.name}</li>)
                })}
            </ul>
        </div>
    )
}