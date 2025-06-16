import {createBrowserRouter} from "react-router-dom";
import MainApp from "../MainApp";
import InProcessing, {
    loaderDataTodos,
    loaderDataTodosByRequestFilter
} from "../Components/dropdown/dropdowns/InProcessing";
import FinishedTasks from "../Components/dropdown/dropdowns/FinishedTasks";
import App from "../Components/app/App";
import OpenedTasks from "../Components/dropdown/OpenedTasks";
import CreateTask, {createTaskAction} from "../Components/formForTask/CreateTask";
import UpdateTask, {updateTaskAction} from "../Components/updateTask/UpdateTask";
import Shop from "../Components/products/Shop";

const routers = [
    {
        path: '/',
        element: <MainApp/>,
        children: [
            {
                index: true,
                element: <App/>,
            },
            {
                path: "shop",
                element: <Shop/>,
                children: [
                    {
                        path: "cart",
                        element: <Shop/>,
                    }
                ]
            },
            {
                path: "/opened",
                element: <OpenedTasks/>,
                children: [
                    {
                        path: "time_is_up",
                        element: <InProcessing filterType="expired"/>,
                        loader: loaderDataTodos,
                    },
                    {
                        path: "there_is_time",
                        element: <InProcessing filterType="active"/>,
                        loader: loaderDataTodosByRequestFilter,
                    }
                ]
            },
            {
                path: "/finished",
                element: <FinishedTasks/>
            },
            {
                path: "/createTask",
                element: <CreateTask/>,
                action: createTaskAction
            },
            {
                path: "/updateTask/:taskId/editing",
                element: <UpdateTask/>,
                action: updateTaskAction
            }
        ]
    }
]

export const router = createBrowserRouter(routers);