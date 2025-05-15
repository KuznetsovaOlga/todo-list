import {listAnimals} from "../../animals";
import gameStyle from "./game.module.css";
import {useRef, useState} from "react";

export default function Game () {
    const [isShowCards, setIsShowCards] = useState(true);
    const [isResult, setIsResult] = useState(false);
    const [arrAnimals, setArrAnimals] = useState([]);
    const listRef = useRef(listAnimals);

    const handleFlipCard = (idCard) => {
        const elem = listRef.current?.find(elem => elem.id === idCard)
        elem.show = true
        if (arrAnimals.includes(elem)) return;
        setArrAnimals(prevState => [...prevState, elem])
    }

    const handleShowCard = () => {
        setIsShowCards(prevState => !prevState);
        setArrAnimals([]);
        setIsResult(false);
        listRef.current.map(it => it.show = false);
    }

    const handleCheckCard = () => {
        if (arrAnimals.length > 0) {
            setIsResult(arrAnimals[0].name === arrAnimals[1].name)
        }
        setIsShowCards(true);
    }

    return (
        <div className={gameStyle.containerBlock}>
            <h1 className={gameStyle.title}>Карточная игра "Запомни попарно"</h1>
            <button
                onClick={handleShowCard}
                type="button"
                className={gameStyle.button}
            >
                Начать игру
            </button>
            <button
                onClick={handleCheckCard}
                type="button"
                className={gameStyle.button}
            >
                Проверить
            </button>
            {isShowCards && arrAnimals?.length === 2 && <h2>{isResult ? "Вы нашли пару верно!" : "Вы ошиблись =(("}</h2>}
            <ul className={gameStyle.container}>
            {listRef.current.map((item) => (
                    <li
                        key={item.id}
                        className={gameStyle.item}
                        onClick={() => handleFlipCard(item.id)}
                    >
                        {
                            isShowCards && (
                                    <>
                                        <p className={gameStyle.itemTitle}>{item.name}</p>
                                        <img name={item.name} src={item.path} width={150} height={150}/>
                                        {item.show && <p>Выбрали эту карточку</p>}
                                    </>
                                )
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};