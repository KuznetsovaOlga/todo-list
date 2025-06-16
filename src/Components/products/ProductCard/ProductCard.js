import React, {useEffect, useState} from "react";
import productModules from '../products.module.css';
import {removeFromCart, sentProductInCart} from "../../../slices/listNotesSlices";
import {useDispatch} from "react-redux";

export default function ProductCard ({product}) {
    const [isShowBtnCart, setIsShowBtnCart] = useState(false);
    const [countCart, setCountCart] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        setIsShowBtnCart(!isShowBtnCart);
        dispatch(sentProductInCart({product, quantity: countCart}));
    }

    useEffect(() => {
        if (countCart < 1) {
            setIsShowBtnCart(!isShowBtnCart);
        }
    }, [countCart]);

    const increase = () => {
        setCountCart(prevState => {
            const newCount = prevState + 1;
            dispatch(sentProductInCart({product, quantity: newCount}));
            return newCount;
        })
    }

    const decrease = () => {
        setCountCart(prevState => prevState - 1)
        dispatch(removeFromCart(product?.id));
    }
    
    return (
        <li key={product.id} className={productModules.product}>
            <p className={productModules.title}>{product.title}</p>
            <img src={product.thumbnail} alt={product.title} />
            <p className={productModules.subtitle}>{product.price} $</p>
            <p>{product.description}</p>
            {
                isShowBtnCart
                ? (<div className={productModules.btn}>
                        <button
                            className={productModules.button}
                            onClick={decrease}
                        >
                            -
                        </button>
                        <input
                            className={productModules.countValue}
                            readOnly
                            value={countCart}
                        />
                        <button
                            className={`${productModules.button} ${productModules.btn_right}`}
                            onClick={increase}
                        >
                            +
                        </button>

                    </div>)
                    : (<button
                        className={productModules.button}
                        onClick={handleAddToCart}
                    >
                        Добавить в корзину
                    </button>)
            }
        </li>
    )
}