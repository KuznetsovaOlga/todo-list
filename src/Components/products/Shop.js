import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allListNotes, cart, fetchAllCart} from "../../slices/listNotesSlices";
import ProductCard from "./ProductCard/ProductCard";
import productModules from "./products.module.css";
import DropdownShop from "./DropdownShpw/DropdownShop";

import {ReactComponent as CartIcon} from "../../assets/icons/cart.svg";
import {NavLink, useLocation} from "react-router-dom";
import Cart from "../cart/Cart";

export default function Shop () {
    const listProducts = useSelector(allListNotes) || localStorage.getItem('cart');
    const listCart = useSelector(cart);
    const location = useLocation();
    console.log('listCart', listCart)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCart());
    }, [dispatch]);

    return (
        <>
            { location?.pathname.includes("cart")
            ? (<Cart/>)
            : (
                <div className={productModules.block}>
                    <h1>Новые продукты уже рядом !</h1>
                    <div className={productModules.wrap}>
                        <DropdownShop/>
                        <NavLink to='cart' className={productModules.iconWrap}>
                            <CartIcon width="100px" height="100px"/>
                            {listCart?.length > 0 &&
                                <span className={productModules.iconCount}>{listCart?.length}</span>}
                        </NavLink>

                    </div>
                    <ul className={productModules.container}>
                        {listProducts?.map((item) => (
                            <ProductCard key={item.id} product={item}/>
                        ))}
                    </ul>
                </div>
                )}
        </>
    )
}