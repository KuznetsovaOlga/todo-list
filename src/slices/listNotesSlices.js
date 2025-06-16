import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    listNotes: [],
    cart: [],
}

export const fetchAllCart = createAsyncThunk(
    'cart/fetchAllCart',
    async () => {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    }
)

export const fetchCartByCategory = createAsyncThunk(
    'cart/fetchCartByCategory',
    async (category) => {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await response.json();
        return data.products;
    }
)

const listNotesSlices = createSlice({
    name: 'listNotes',
    initialState,
    reducers: {
        sentProductInCart: {
            reducer: (state, action) => {
                const product = action.payload.product;
                const existingItemIndex  = state.cart.findIndex(item => {
                    return item.product.id === product.id
                })
                if (existingItemIndex >=0) {
                    state.cart[existingItemIndex].quantity += 1;
                } else {
                    state.cart = [...state.cart, action.payload];
                }
                localStorage.setItem('cart', JSON.stringify(state.cart));
            },
            prepare: (product) => {
                return { payload: product };
            }
        },
        removeFromCart: {
            reducer: (state, action) => {
                state.cart = state.cart.filter(item => item.product.id !== action.payload);
                localStorage.setItem('cart', JSON.stringify(state.cart));
            },
            prepare: (id) => {
                return { payload: id };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCart.fulfilled, (state, action) => {
                state.listNotes = action.payload;
            })
            .addCase(fetchCartByCategory.fulfilled, (state, action) => {
                state.listNotes = action.payload;
            })
    },
    selectors: {
        allListNotes: state => state.listNotes,
        cart: state => state.cart,
    }

})

const {actions, reducer, selectors} = listNotesSlices;
export const {
    sentProductInCart,
    removeFromCart,
} = actions;
export const {allListNotes, cart} = selectors;

export default reducer;