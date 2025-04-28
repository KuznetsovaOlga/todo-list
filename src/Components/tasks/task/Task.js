import menuStyle from "./task.module.css"
import {useState} from "react";

export default function Task({dataTask}) {
    const [isShowDescription, setIsShowDescription] = useState(false)

    return (
        <li
            key={dataTask.id}
            onClick={()=>setIsShowDescription(prevState => !prevState)}
            className={menuStyle.item}
        >
            <p className={menuStyle.text}>Задача {dataTask.id}</p>
            {isShowDescription
                ? <p className={menuStyle.text}>Детали: {dataTask.description}</p>
                : null
            }
        </li>
    )
}