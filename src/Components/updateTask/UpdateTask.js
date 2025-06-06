import formStyles from './updateTask.module.css';
import {Form, redirect, useParams} from "react-router-dom";
import {useContext, useRef} from "react";
import {TasksContext} from "../../MainApp";

const min = 10;
const max = 100;
const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

export const updateTaskAction = async ({request}) => {
    const formData = await request.formData();
    const listTasks = localStorage.getItem('listTasks');
    const tasks = listTasks ? JSON.parse(listTasks) : [];

    const arrMarkers = []
    if (formData.get('markersCheckbox')) arrMarkers.push('срочно')
    if (formData.get('markers').length) arrMarkers.push(formData.get('markers'));

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

    return redirect('/createTask');
}

export default function UpdateTask() {
    const {taskId} = useParams();
    const { listTasks } = useContext(TasksContext) || {};
    const task = listTasks.filter(item => item.id === Number(taskId));

    const formRef = useRef(null);

    return (
        <Form className={formStyles.form} ref={formRef} method="post">
            <div className={formStyles.formBlock}>
                <div className={formStyles.formItem}>
                    <label>Задача</label>
                    <input
                        type='text'
                        name='name'
                        defaultValue={task[0].name}
                    />
                </div>
                <div className={formStyles.formItem}>
                    <label>Описание задачи</label>
                    <input
                        type='text'
                        name='description'
                        defaultValue={task[0].description}
                    />
                </div>
                <div className={formStyles.formItem}>
                    <label>Участники</label>
                    <input
                        type='text'
                        name='participants'
                        defaultValue={task[0].participants}
                    />
                </div>
                <div className={formStyles.formItem}>
                    <div>
                        <label>Срочность</label>
                        <input
                            type="checkbox"
                            name='markersCheckbox'
                            defaultChecked={task[0].markers.includes('срочно')}
                        />
                    </div>
                    <div className={formStyles.formItem}>
                        <label>Тип задачи</label>
                        <input
                            type='text'
                            name='markers'
                            defaultValue={task[0].markers.includes('задание') ? 'задание' : 'покупка'}
                        />
                    </div>
                </div>

                <input className={formStyles.button} type="submit" value="Сохранить изменения"/>
            </div>
        </Form>
    )
}