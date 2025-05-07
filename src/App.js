import Banner from "./Components/banner/Banner";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import Tasks from "./Components/tasks/Tasks";
import {listTasks as initialTasks} from "./tasks";
import {createContext, useState} from "react";
import Form from "./Components/form/Form";

export const TasksContext = createContext({
    listTasks: [],
    setListTasks: ()=>{}
})

export const filterTask = (listTasks = []) => {
    const currentData = new Date();
    const list = listTasks.filter(task => task.endDate >= currentData)
    return list.sort((a, b) => a.endDate - b.endDate);
}

function App() {
  const [listTasks, setListTasks] = useState(()=>{
      return filterTask(initialTasks);
  });

  return (
      <>
          <Header />
          <TasksContext.Provider value={{listTasks, setListTasks}}>
              <Form/>
              <Tasks />
          </TasksContext.Provider>
          <Banner />
          <Footer />
      </>
  );
}

export default App;
