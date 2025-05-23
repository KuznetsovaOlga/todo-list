export const getDataTodos = async (title) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        if (!response.ok) { throw new Error(response.statusText)}
        const todos = await response.json();
        todos.length = 10
        if (title) {
            return todos.filter(item=> item.title.includes(title))
        } else {
            return todos;
        }
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}