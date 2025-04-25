import menuStyle from "./task.module.css"
import listTasks from "../../tasks"

export default function Task({dataTask}) {
    return <li className={menuStyle.item}>{dataTask.description}</li>
}