import {useRef} from "react";

import {ReactComponent as ScrollDown} from "../../assets/icons/scroll-down.svg";

import Slider from "../slider/Slider";
import Game from "../game/Game";
import Tasks from "../tasks/Tasks";
import Banner from "../banner/Banner";

function App() {

    const footerRef = useRef(null)

    const handleScrollDown = () => {
        if (footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            <Slider/>
                <button
                    onClick={handleScrollDown}
                    style={{
                        cursor: "pointer",
                        backgroundColor:"white",
                        position:"absolute",
                        top:"70px",
                        right:"10px",
                        borderRadius:"10px"
                    }}
                >
                    <p>Прокрутить вниз</p>
                    <ScrollDown width="50" height="50"/>
                </button>
                <Tasks />
            <Banner />
            <Game/>
        </>



    );
}

export default App;
