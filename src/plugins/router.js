import {createBrowserRouter} from "react-router-dom";
import MainApp from "../MainApp";
import InProcessing, {
    loaderDataTodos,
    loaderDataTodosByRequestFilter
} from "../Components/dropdown/dropdowns/InProcessing";
import FinishedTasks from "../Components/dropdown/dropdowns/FinishedTasks";
import App from "../Components/app/App";
import OpenedTasks from "../Components/dropdown/OpenedTasks";
import Form from "../Components/form/Form";

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
                path: "/form",
                element: <Form/>
            }
        ]
    }
]

export const router = createBrowserRouter(routers);