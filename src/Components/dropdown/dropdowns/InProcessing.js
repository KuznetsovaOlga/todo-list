import {listTasks} from "../../../tasks";
import {Form, useLoaderData, useSubmit} from "react-router-dom";
import {getDataTodos} from "../../../requests/getData";

export const loaderDataTodos = async () => {
    const todos = await getDataTodos()
    return {todos}
}

export const loaderDataTodosByRequestFilter = async ({request}) => { // так как в router.js есть эти loader-загрузчики, поэтому здесь в props мы получаем объект request, params(и строки поиска)
    const url = new URL(request.url)
    const todosFilter = url.searchParams.get("todos_filter")
    const todos = await getDataTodos(todosFilter)
    return {todos}
}

export default function InProcessing({ filterType }) {
    const { todos } = useLoaderData();
    const submit = useSubmit();

    const filterTasks = () => {
        const currentDate = new Date();

        const filtered = listTasks.filter(task => {
            return filterType === 'expired'
                ? task.endDate < currentDate
                : task.endDate > currentDate;
        });

        return filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    };

    const listSorted = filterTasks();
    return (
        <div>
            <h1>Информация о задачах</h1>
            <ul>
                {listSorted.map((task) => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
            {
                filterType === "active" && (
                    <>
                        <h1>Информация о новых пользователях</h1>
                        <Form>
                            <input
                                type="search"
                                name="todos_filter"
                                placeholder="Поиск по названию"
                                onChange={(event) => submit(event.currentTarget.form)}
                            />
                        </Form>
                        {
                            todos.length && (
                                <ul>
                                    {todos?.map((item) => (
                                        <li key={item.id}>{item.todo}</li>
                                    ))}
                                </ul>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}