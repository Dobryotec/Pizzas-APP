import { RootState } from "../store";

export const selectItems = (state: RootState) => state.cart.items;

export const selectCart = (state: RootState) => state.cart;
