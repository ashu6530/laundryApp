import { configureStore } from "@reduxjs/toolkit";
import Cartreducer from "./Cartreducer";
import Productreducer from "./Productreducer";

export const store = configureStore({
    reducer: {
        cart:Cartreducer,
        product:Productreducer
    },
  })