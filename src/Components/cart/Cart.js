import cartStyle from "./cart.module.css"
import {useDispatch, useSelector} from "react-redux";
import {cart, removeFromCart} from "../../slices/listNotesSlices";
import React, {useMemo} from "react";

export default function Cart() {
    const listCart = useSelector(cart);
    const dispatch = useDispatch();

    const sumForPay = useMemo(() => {
        let res = 0;
        listCart.map((item, index) => {
            if (item.quantity > 0) {
                const multi = Number(item.product.price) * item.quantity;
                res += multi
            } else {
                res += Number(item.product.price)
            }
        })
        return res.toFixed(2); ;
    }, [listCart])

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <figure>
            {
                listCart?.length > 0
                    ? (<>
                        <h1>Корзина</h1>
                        <ul className={cartStyle.list}>
                            {listCart.map((item, index) => (
                                <li
                                    key={item.product.id}
                                    className={cartStyle.list_item}
                                >
                                    <div>
                                        <h2>{item.product.title}</h2>
                                        <p>{item.product.description}</p>
                                    </div>
                                    <img width="100px" src={item.product.thumbnail} alt={item.product.title}/>
                                    <div className={cartStyle.wrap}>
                                        <p className={cartStyle.list_info}>Цена: {item.product.price} $</p>
                                        <p className={cartStyle.list_info}>Кол-во: {item.quantity}</p>
                                    </div>
                                    <button
                                        className={cartStyle.btn}
                                        onClick={()=>handleRemoveFromCart(item.product.id)}
                                    >
                                        Удалить из корзины
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p className={cartStyle.result}>Сумма к оплате: {sumForPay} $</p>
                    </>)
                    : (<h1 style={{textAlign: "center"}}>Корзина пока что пустая!</h1>)
            }

        </figure>
    )
}