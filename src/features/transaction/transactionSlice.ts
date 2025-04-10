import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
}

interface PaymentData {
    name: string;
    address: string;
    city: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
}

interface Transaction {
    id: string;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    wompiId?: string;
    amount: number;
    productId: string;
    customerEmail: string;
    deliveryInfo: string;
}

interface TransactionState {
    selectedProduct: Product | null;
    paymentData: PaymentData | null;
    transactionResult: Transaction | null;
}

const initialState: TransactionState = {
    selectedProduct: null,
    paymentData: null,
    transactionResult: null,
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setSelectedProduct(state, action: PayloadAction<Product>) {
            state.selectedProduct = action.payload;
        },
        setPaymentData(state, action: PayloadAction<PaymentData>) {
            state.paymentData = action.payload;
        },
        setTransactionResult(state, action: PayloadAction<Transaction>) {
            state.transactionResult = action.payload;
        },
        clearTransaction(state) {
            state.selectedProduct = null;
            state.paymentData = null;
            state.transactionResult = null;
        },
    },
});

export const {
    setSelectedProduct,
    setPaymentData,
    setTransactionResult,
    clearTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;