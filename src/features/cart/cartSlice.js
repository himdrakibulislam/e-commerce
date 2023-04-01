import {  createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
const initialState = {
    cart:[],
    isLoading: false,
    isError: false,
    dialogStatus:false,
    searchDialog:false,
  }


//set to local storage
const setLocalStorage  = (data) =>{
    let stringCart = JSON.stringify(data);
    localStorage.setItem('cart',stringCart); 
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setDialogStatus:(state,action) =>{
            state.dialogStatus = action.payload;
        },
        setSearchDialog:(state,action) =>{
            state.searchDialog = action.payload;
        },
        cartPersistency:(state,{payload})=>{
            state.cart = payload;
        },
        addToCart:(state,{payload}) =>{
            
            const cart = {...payload,qty:1};
            const cartExists = state.cart.find(cartItem => cartItem.id === payload.id);
            if(cartExists){
                cartExists.qty += 1;
            } else{
                state.cart.push(cart);
            }
            setLocalStorage(state.cart); 
            toast.success('Product added to cart');    
        },
        removeFromCart:(state,{payload})=>{
            const newCart = state.cart.filter(ct => ct.id !== payload);
            state.cart = newCart;
            setLocalStorage(newCart);
            
        },
        cartQtyIncrement:(state,{payload})=>{
           const Icart = state.cart.filter(crt => {
             if(crt.id === payload){
                if(crt.qty >= 10){
                    crt.qty = 10;
                }else{
                    crt.qty += 1;
                }
             }
             return crt;
           });
           state.cart = Icart;
           setLocalStorage(Icart);
           
        },
        cartQtyDecrement:(state,{payload})=>{
            const Dcart = state.cart.filter(crt => {

                if(crt.id === payload){
                    if(crt.qty <= 1){
                        crt.qty = 1;
                    }else{
                        crt.qty -= 1;
                    }
                 }
                
                return crt;
               });
              state.cart = Dcart;
              setLocalStorage(Dcart);
        }
    }
});

export const {
    setDialogStatus,
    setSearchDialog,
    addToCart,
    cartPersistency,
    removeFromCart,
    cartQtyIncrement,
    cartQtyDecrement,
} = cartSlice.actions;
export default cartSlice.reducer ; 