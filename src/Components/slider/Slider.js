import sliderStyle from './slider.module.css';
import {listNature} from "../../nature";
import {ReactComponent as ArrowLeft} from "../../assets/icons/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../assets/icons/arrow-right.svg";
import {useEffect, useState} from "react";

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mainImageId, setMainImageId] = useState(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === listNature.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? listNature.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const idFromLS = Number(localStorage.getItem('mainNatureImageId'));

        if (idFromLS) {
            setMainImageId(idFromLS);
            const index = listNature.findIndex(item => item.id === idFromLS);
            if (index !== -1) setCurrentIndex(index);
        } else {
            localStorage.removeItem('mainNatureImageId');
        }
    },[])

    const handleSetAsMain =(id)=> {
        setMainImageId(id);
        localStorage.setItem('mainNatureImageId', id)

        const index = listNature.findIndex(item => item.id === id);
        if (index !== -1) setCurrentIndex(index);
    }

    return (
        <div className={sliderStyle.container}>
            <h1>Природа</h1>
            <div className={sliderStyle.innerContainer}>
                <button
                    className={`${sliderStyle.innerButton} ${sliderStyle.innerButtonLeft}`}
                    onClick={handlePrev}
                >
                    <ArrowLeft width="50" height="50"/>
                </button>
                <button
                    className={`${sliderStyle.innerButton} ${sliderStyle.innerButtonRight}`}
                    onClick={handleNext}
                >
                    <ArrowRight width="50" height="50"/>
                </button>

                <ul className={sliderStyle.slider}>
                    {listNature.map((item, index) =>
                        <li
                            className={`${sliderStyle.sliderItem} ${index === currentIndex ? sliderStyle.active : ''}`}
                            key={item.id}
                            style={{transform: `translateX(-${currentIndex * 100}%)`}}
                        >
                            <img src={item.path} width={700} height={400}/>
                            <button
                                className={sliderStyle.setMainButton}
                                onClick={() => handleSetAsMain(item.id)}
                            >
                                {mainImageId === item.id ? '★ Основное' : 'Сделать основным'}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    );
}

export default Slider;