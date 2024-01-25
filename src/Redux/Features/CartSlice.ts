import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number
}

const initialState: ICart = {
  products: [],
  total: 0,
};
const cartSliece = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existing) {
        existing.quantity = existing.quantity! + 1
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price
    },
    addOneMore: (state, action: PayloadAction<IProduct>) => {
      const existingOne = state.products.find((product) => product._id === action.payload._id);

      if (existingOne) {
        existingOne.quantity= existingOne.quantity! + 1
      }
      state.total += action.payload.price
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter((product) => product._id !== action.payload._id);
      state.total -= action.payload.price * action.payload.quantity!
    },
    minusOnefromQuantity: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find((product) => product._id === action.payload._id);

      if (existing) {
        const ZeroValue = existing.quantity = existing.quantity! - 1;
        
        if (ZeroValue === 0) {
          state.products = state.products.filter((product)=>  product._id !== action.payload._id)

        }

      }
      state.total -= action.payload.price
  }
  }
});

export const { addToCart, removeFromCart, minusOnefromQuantity, addOneMore } = cartSliece.actions;

export default cartSliece.reducer;
