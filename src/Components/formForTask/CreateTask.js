import formStyles from './form.module.css';
import {Form, useActionData} from "react-router-dom";
import {useContext, useEffect, useRef} from "react";
import commonStyle from "../../assets/styles/commonStyles.module.css";
import tasksStyle from "../tasks/tasks.module.css";
import Task from "../tasks/task/Task";
import {TasksContext} from "../../MainApp";

const min = 10;
const max = 100;
const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

export const createTaskAction = async ({request}) => {
    const formData = await request.formData();
    const listTasks = localStorage.getItem('listTasks');
    const tasks = listTasks ? JSON.parse(listTasks) : [];

    const arrMarkers = []
    if (formData.get('markersCheckbox')) arrMarkers.push('срочно')
    if (formData.get('markers').length) arrMarkers.push(formData.get('markers').toLocaleLowerCase());

    const newTask = {
        name: formData.get('name'),
        id: randomNum,
        description: formData.get('description'),
        participants: [formData.get('participants')],
        markers: arrMarkers,
        createDate: new Date(),
        endDate: new Date(Date.now() + Math.random() * 100),
        isOpened: true
    }

    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('listTasks', JSON.stringify(updatedTasks));

    return { success: true };
}

export default function CreateTask() {
    const listTasksFromLocalST = localStorage.getItem('listTasks');
    const { listTasks, setListTasks } = useContext(TasksContext) || {};

    const formRef = useRef(null);
    const actionData = useActionData(); // Результат из action (который вызывается в react-router по кнопке submit)

    useEffect(() => {
        if (actionData?.success && formRef.current) {
            formRef.current.reset(); // сброс формы

            const checkbox = formRef.current.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false;
            }
        }
    }, [actionData]);

    useEffect(() => {
        setListTasks(JSON.parse(listTasksFromLocalST));
    }, [listTasksFromLocalST, actionData]);

    return (
        <Form className={formStyles.form} ref={formRef} method="post">
            <div className={formStyles.formBlock}>
                <div className={formStyles.formItem}>
                    <label>Задача</label>
                    <input type='text' name='name'/>
                </div>
                <div className={formStyles.formItem}>
                    <label>Описание задачи</label>
                    <input type='text' name='description'/>
                </div>
                <div className={formStyles.formItem}>
                    <label>Участники</label>
                    <input type='text' name='participants'/>
                </div>
                <div className={formStyles.formItem}>
                    <div>
                        <label>Срочность</label>
                        <input type="checkbox" name='markersCheckbox'/>
                    </div>
                    <div className={formStyles.formItem}>
                        <label>Тип задачи</label>
                        <input type='text' name='markers'/>
                    </div>
                </div>

                <input className={formStyles.button} type="submit" value="Добавить задачу"/>
            </div>

            <ul className={`${commonStyle.common_list} ${tasksStyle.list}`}>
                {listTasks.map(task => {
                    if (task.isOpened) {
                        return (
                            <Task
                                key={task.id}
                                dataTask={task}
                            />
                        )
                    }
                })
                }
            </ul>
        </Form>
    )
}