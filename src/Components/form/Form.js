import formStyles from './form.module.css';
import {useContext, useState} from "react";
import {TasksContext} from "../../App";

const min = 10;
const max = 100;
const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomNum);

export default function Form() {
    const { setListTasks } = useContext(TasksContext) || {};
    const [isChecked, setIsChecked] = useState(false)
    const [dataForm, setDataForm] = useState(
        {
            id: "",
            name: "",
            createDate: "",
            endDate:  "",
            markers: [],
            description: "",
            participants: [],
        }
    )

    const handleSubmit = () => {
        setListTasks(prevTasks => ([...prevTasks, dataForm]))
    }

    const handleChangeInput = (event) => {
        const {value, name} = event.target;

        setDataForm(prevState => ({
            ...prevState,
            [name]: name === 'participants' || name === 'markers' ? [...(prevState[name] || []), value] : value,
            id: randomNum,
            createDate: new Date(),
            endDate: new Date(Date.now() + Math.random() * 100),
        }))
    }

    const handleChangeCheckbox = (event) => {
        const {value, name} = event.target;
        if (value) {
            setDataForm(prevState => ({
                ...prevState,
                [name]: [...prevState.markers, 'срочно'],
            }))
        }
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit()
            }}
            className={formStyles.form}
        >
            <div className={formStyles.formBlock}>
                <div className={formStyles.formItem}>
                    <label>Задача</label>
                    <input
                        type='text'
                        name='name'
                        onChange={(event) => handleChangeInput(event)}
                    />
                </div>
                <div className={formStyles.formItem}>
                    <label>Описание задачи</label>
                    <input
                        type='text'
                        name='description'
                        onChange={(event) => handleChangeInput(event)}
                    />
                </div>
                <div className={formStyles.formItem}>
                    <label>Участники</label>
                    <input
                        type='text'
                        name='participants'
                        onChange={(event) => handleChangeInput(event)}
                    />
                </div>
                <div className={formStyles.formItem}>
                    <div>
                        <label>Срочность</label>
                        <input
                            type="checkbox"
                            name='markers'
                            value={isChecked}
                            onChange={(event) => handleChangeCheckbox(event)}
                        />
                    </div>
                    <div className={formStyles.formItem}>
                        <label>Тип задачи</label>
                        <input
                            type='text'
                            name='markers'
                            onChange={(event) => handleChangeInput(event)}
                        />
                    </div>
                </div>

                <input
                    className={formStyles.button}
                    type="submit"
                    value="Добавить задачу"
                />
            </div>
        </form>
    )
}