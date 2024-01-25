import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IProduct = {
  status: boolean;
  priceRange: number;
};

const initialState: IProduct = {
  status: false,
  priceRange: 150,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggle: (state) => {
      state.status = !state.status
    },
    setPriceRang: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload
    }
  },
});

export const { toggle, setPriceRang}= productSlice.actions

export default productSlice.reducer;
