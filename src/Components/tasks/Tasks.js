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
    const copeTaskArray = JSON.parse(JSON.stringify(tasks));

    const handleChangeMarker = (searchValue) => {
        if (searchValue.length) {
            const newList = copeTaskArray.filter(task => {
              return task.markers.some(marker => marker.toLowerCase().includes(searchValue.toLowerCase()))
            })
            setTasks(newList);
        } else {
            return setTasks(filterTask());
        }
    }

    const handleSort = (property) => {
        const sortData = copeTaskArray.sort((a, b) => {
            if (property === 'participants') {
                return a[property].length - b[property].length
            } else {
                return a[property].localeCompare(b[property])
            }
        });
        setTasks(sortData);
    }

    return (
        <div className={tasksStyle.container}>
            <h2 className={tasksStyle.header}>Задачи для работы:</h2>
            <div className={tasksStyle.filter}>
                <button
                    type="button"
                    className={`${tasksStyle.button} ${tasksStyle.buttonFilter}`}
                    onClick={() => handleSort('description')}
                >
                    Отсортировать по алфавиту
                </button>
                <button
                    type="button"
                    className={`${tasksStyle.button} ${tasksStyle.buttonFilter}`}
                    onClick={() => handleSort('participants')}
                >
                    Отсортировать по кол-ву участников
                </button>
                <button
                    type="button"
                    className={`${tasksStyle.button} ${tasksStyle.buttonFilter}`}
                    onClick={() => handleChangeMarker('срочно')}
                >
                    Срочные
                </button>
                <button
                    type="button"
                    className={`${tasksStyle.button} ${tasksStyle.buttonFilter}`}
                    onClick={() => handleSort('createDate')}
                >
                    Отсортировать по дате создания
                </button>
            </div>
            <Search
                className={tasksStyle.text}
                onChangeMarker={(e) => handleChangeMarker(e)}
            />
            <ul className={`${commonStyle.common_list} ${tasksStyle.list}`}>
                {tasks.map(task =>
                    <Task
                        key={task.id}
                        tasks={tasks}
                        dataTask={task}
                        setTasks={setTasks}
                    />
                )}
            </ul>
        </div>
    )
}