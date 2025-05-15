import Banner from "./Components/banner/Banner";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import Tasks from "./Components/tasks/Tasks";
import {listTasks as initialTasks} from "./tasks";
import {createContext, useRef, useState} from "react";
import Form from "./Components/form/Form";
import {ReactComponent as ScrollDown} from "./assets/icons/scroll-down.svg";
import Game from "./Components/game/Game";

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

  const footerRef = useRef(null)

  const handleScrollDown = () => {
      if (footerRef.current) {
          footerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }

  return (
      <div style={{position:"relative"}}>
          <Header />
          <TasksContext.Provider value={{listTasks, setListTasks}}>
              <button
                  onClick={handleScrollDown}
                  style={{
                      cursor: "pointer",
                      backgroundColor:"white",
                      position:"absolute",
                      top:"70px",
                      right:"150px"
                  }}
              >
                  <p>Прокрутить вниз</p>
                  <ScrollDown width="50" height="50"/>
              </button>
              <Form/>
              <Tasks />
          </TasksContext.Provider>
          <Banner />
          <Game/>
          <Footer ref={footerRef}/>
      </div>
  );
}

export default App;
