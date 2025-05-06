import menuStyle from "./task.module.css"
import {useState} from "react";
import {ReactComponent as ShowDetail} from "../../../assets/icons/showDetail.svg";

export default function Task({dataTask, tasks, setTasks}) {
    const [isShowDescription, setIsShowDescription] = useState(false)
    const [isDisable, setIsDisable] = useState(true)

    const handleChangeParticipant = ({target}) => {
        const newArr = tasks.map((task) =>
        task.id === dataTask.id ? {...task, participants: [target.value]} : task)
        setTasks(newArr)
    }

    const handleDeleteTask = (idTask) => {
        setTasks(tasks.filter(task => task.id !== idTask))
    }

    return (
        <li
            key={dataTask.id}
            className={menuStyle.item}
        >
            <h2 className={menuStyle.text}>Задача {dataTask.id} {dataTask.name}</h2>
            <div>
                <span className={menuStyle.detailContainer}>
                    <p className={menuStyle.text}>Показать детали задачи</p>
                <button
                    type="button"
                    className={menuStyle.button}
                    onClick={() => setIsShowDescription(prevState => !prevState)}
                >
                    <ShowDetail width="20" height="20"/>
                </button>
                </span>

                {isShowDescription
                    ? <div>
                        <p className={menuStyle.text}>Описание: {dataTask.description}</p>
                        <p className={menuStyle.text}>Участники задачи:</p>
                        <div className={menuStyle.list}>
                            <input
                                type="text"
                                style={{width: "-webkit-fill-available"}}
                                value={dataTask.participants}
                                disabled={isDisable}
                                onChange={(e) => handleChangeParticipant(e)}
                            />
                            <button
                                type="button"
                                className={`${menuStyle.button} ${menuStyle.buttonEdit}`}
                                onClick={() => setIsDisable(prevState => !prevState)}
                            >
                                {isDisable ? "Редактировать" : "Сохранить"}
                            </button>
                        </div>
                    </div>
                    : null
                }
            </div>


            <button
                type="button"
                className={`${menuStyle.button} ${menuStyle.close}`}
                onClick={()=> handleDeleteTask(dataTask.id)}
            >
                X
            </button>
        </li>
    )
}