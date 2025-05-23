import tasksStyle from "./tasks.module.css"
import Task from "./task/Task";
import commonStyle from "../../assets/styles/commonStyles.module.css";
import {useContext} from "react";
import Search from "../search/Search";
import {listTasks as initialTasks} from "../../tasks";
import {filterTask, TasksContext} from "../../MainApp";

export default function Tasks() {
    const { listTasks, setListTasks } = useContext(TasksContext) || {};

    const copeTaskArray = JSON.parse(JSON.stringify(listTasks));

    const handleChangeMarker = (searchValue) => {
        if (searchValue.length) {
            const newList = copeTaskArray.filter(task => {
              return task.markers.some(marker => marker?.toLowerCase().includes(searchValue?.toLowerCase()))
            })
            setListTasks(newList)
        } else {
            setListTasks(filterTask(initialTasks))
        }
    }

    const handleSort = (property) => {
        const sortData = copeTaskArray.sort((a, b) => {
            if (property === 'participants') {
                return a[property]?.length - b[property]?.length
            } else {
                return a[property].localeCompare(b[property])
            }
        });
        setListTasks(sortData)
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
                {listTasks.map(task => {
                    if (task.isOpened) {
                        return (
                            <Task
                                key={task.id}
                                dataTask={task}
                            />
                        )}
                    })
                }
            </ul>
        </div>
    )
}