import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import {createContext, useEffect, useRef, useState} from "react";
import {Outlet} from "react-router-dom";
import {listTasks as initialTasks} from "./tasks";
import Dropdown from "./Components/dropdown/Dropdown";
import {ReactComponent as ScrollDown} from "./assets/icons/scroll-down.svg";

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
        const savedTasks = localStorage.getItem('listTasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

  const [isShowBar, setIsShowBar] = useState(false);
  const [isShowSecondBar, setIsShowSecondBar] = useState(false);

    useEffect(() => {
        localStorage.setItem('listTasks', JSON.stringify(filterTask(initialTasks)));
    }, [listTasks]);

  const footerRef = useRef(null)

  const handleOpenTaskBar = () => {
    setIsShowBar(prevState => !prevState);
  }
  const handleOpenSecondTaskBar = () => {
      setIsShowSecondBar(true);
  }

    const handleScrollDown = () => {
        if (footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

  return (
      <div style={{position: "relative"}}>
          <TasksContext.Provider value={{listTasks, setListTasks, isShowBar, isShowSecondBar}}>
              <button
                  onClick={handleScrollDown}
                  style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      position: "absolute",
                      top: "70px",
                      right: "10px",
                      borderRadius: "10px"
                  }}
              >
                  <p>Прокрутить вниз</p>
                  <ScrollDown width="50" height="50"/>
              </button>
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
