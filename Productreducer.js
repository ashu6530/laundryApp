import { createSlice } from "@reduxjs/toolkit";
import { incrementQuantity } from "./Cartreducer";

const initialState ={
    product:[],
} 
export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
         getProducts:(state,action)=>{
           state.product.push(action.payload)
         },
         incrementQty:(state,action)=>{
            const itemPresent = state.product.find(
                (item) => item.id === action.payload.id
              );
              itemPresent.quantity++;
         },
         decrementQty:(state,action)=>{
            const itemPresent = state.product.find(
                (item) => item.id === action.payload.id
              );
             
                itemPresent.quantity--;
              
         }
    }
})

export const {getProducts,incrementQty,decrementQty} =productSlice.actions;
export default productSlice.reducer;