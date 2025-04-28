import tasksStyle from "./tasks.module.css"
import listTasks from "../../tasks"
import Task from "./task/Task";
import commonStyle from "../../assets/styles/commonStyles.module.css";
import {useState} from "react";
import Search from "../search/Search";

const filterTask = () => {
    const currentData = new Date();
    const list = listTasks.filter(task => task.endDate >= currentData)
    return list.sort((a, b) => a.endDate - b.endDate);
}

export default function Tasks() {
    const [tasks, setTasks] = useState(()=>{
        return filterTask();
    });

    const handleChangeMarker = (searchValue) => {
        const copeTaskArray = JSON.parse(JSON.stringify(tasks));
        if (searchValue.length) {
            const newList = copeTaskArray.filter(task => {
              return task.markers.some(marker => marker.toLowerCase().includes(searchValue.toLowerCase()))
            })
            setTasks(newList);
        } else {
            return setTasks(filterTask());
        }
    }

    return (
        <div className={tasksStyle.container}>
            <h2 className={tasksStyle.header}>Задачи для работы:</h2>
            <Search
                className={tasksStyle.text}
                onChangeMarker={(e)=> handleChangeMarker(e)}
            />
            <ul className={`${commonStyle.common_list} ${tasksStyle.list}`}>
                {tasks.map(task=> <Task dataTask={task}/>)}
            </ul>
        </div>
    )
}