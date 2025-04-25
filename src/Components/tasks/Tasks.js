import tasksStyle from "./tasks.module.css"
import listTasks from "../../tasks"
import Task from "../task/Task";
import commonStyle from "../../assets/styles/commonStyles.module.css";

export default function Tasks() {
    const currentData = new Date();
    const list = listTasks.filter(task => task.endDate >= currentData)
    const uncomplitedTasks = list.sort((a, b) => a.endDate - b.endDate)
    const cardTask = uncomplitedTasks.map(task=> <Task dataTask={task}/>)

    return (
        <div>
            <h2 className={tasksStyle.header}>Задачи для работы:</h2>
            <ul className={`${commonStyle.common_list} ${tasksStyle.list}`}>
                {cardTask}
            </ul>
        </div>
    )
}