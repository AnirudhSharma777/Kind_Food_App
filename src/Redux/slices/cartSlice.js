import { createSlice } from "@reduxjs/toolkit";
import {  toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) 
    : [],
    total: localStorage.getItem("total") 
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
    totalItems : localStorage.getItem("totalItems") 
    ? JSON.parse(localStorage.getItem("totalItems")) 
    : 0,
}

export const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers :{
        add: (state, action) =>{
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >= 0){
                // if the course if already in the cart, do not modify the quantity
                toast.error("Course already in cart");
                return
            }

            // if the course is not in the cart, add it to the cart 
            state.cart.push(course)

            // update the total quantity and price
            state.totalItems++;
            state.total += course.price

            // update to localstorage
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

            // show toast
            toast.success("Course added to Cart");
        },
        remove:(state,action) =>{
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            if(index >= 0){
                
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index,1);

                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("total",JSON.stringify(state.total));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

                toast.success("Course remove from Cart");
            }

        },
        resetCart:(state) =>{
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");

        }
    }
})

export const {add,resetCart,remove} = cartSlice.actions;

export default cartSlice.reducer;