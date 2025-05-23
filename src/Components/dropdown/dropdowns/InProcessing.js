import {listTasks} from "../../../tasks";
import {Form, useLoaderData, useSubmit} from "react-router-dom";
import {getDataTodos} from "../../../requests/getData";

export const loaderDataTodos = async () => {
    const todos = await getDataTodos()
    return {todos}
}

export const loaderDataTodosByRequestFilter = async ({request}) => {
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
                filterType === "active" && todos.length && (
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
                        <ul>
                            {todos?.map((item) => (
                                <li key={item.id}>{item.title}</li>
                            ))}
                        </ul>
                    </>
                )
            }
        </div>
    );
}