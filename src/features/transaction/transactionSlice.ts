import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        selectedProduct: null,
        paymentData: null,
        transactionResult: null,
    },
    reducers: {
        setSelectedProduct(state, action: PayloadAction<any>) {
            state.selectedProduct = action.payload;
        },
        setPaymentData(state, action: PayloadAction<any>) {
            state.paymentData = action.payload;
        },
        setTransactionResult(state, action: PayloadAction<any>) {
            state.transactionResult = action.payload;
        },
        clearTransaction(state) {
            state.selectedProduct = null;
            state.paymentData = null;
            state.transactionResult = null;
        },
    }
})

export const {
    setSelectedProduct,
    setPaymentData,
    setTransactionResult,
    clearTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;