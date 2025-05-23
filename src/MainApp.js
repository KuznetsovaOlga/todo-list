import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import {createContext, useRef, useState} from "react";
import {Outlet} from "react-router-dom";
import {listTasks as initialTasks} from "./tasks";
import Dropdown from "./Components/dropdown/Dropdown";

export const TasksContext = createContext({
    listTasks: [],
    isShowSecondBar: false,
    setListTasks: ()=>{}
})

export const filterTask = (listTasks = []) => {
    const currentData = new Date();
    const list = listTasks.filter(task => task.endDate >= currentData)
    return list.sort((a, b) => a.endDate - b.endDate);
}

function MainApp() {
    const [listTasks, setListTasks] = useState(()=>{
        return filterTask(initialTasks);
    });

  const [isShowBar, setIsShowBar] = useState(false);
  const [isShowSecondBar, setIsShowSecondBar] = useState(false);

  const footerRef = useRef(null)

  const handleOpenTaskBar = () => {
    setIsShowBar(prevState => !prevState);
  }
  const handleOpenSecondTaskBar = () => {
      setIsShowSecondBar(true);
  }

  return (
      <div style={{position: "relative"}}>
          <TasksContext.Provider value={{listTasks, setListTasks, isShowBar, isShowSecondBar}}>

              {isShowBar && <Dropdown onClick={handleOpenSecondTaskBar}/>}
              <Header onClick={handleOpenTaskBar}/>

              <main style={{minHeight: "90vh"}}>
                  <Outlet/>
              </main>

              <Footer ref={footerRef}/>
          </TasksContext.Provider>
      </div>
  );
}

export default MainApp;
