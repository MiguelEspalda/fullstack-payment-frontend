import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import API from "../services/api";
import { useState } from "react";
import { setTransactionResult } from "../features/transaction/transactionSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";



export default function SummaryPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { selectedProduct , paymentData } = useAppSelector(state => state.transaction)
    const [loading, setLoading] = useState(false)

    if(!selectedProduct || !paymentData) {
        navigate('/')
        return null
    }

    const deliveryFee = 5000;
    const baseFee = 1500;
    const total = selectedProduct.price + deliveryFee + baseFee;

    const handlePayment = async () => {
        setLoading(true);
        try {
        const response = await API.post('/transactions', {
            productId: selectedProduct.id,
            customerEmail: paymentData.email,
            deliveryInfo: `${paymentData.address}, ${paymentData.city}`,
            amount: total,
        });

        const updated = await API.put(`/transactions/${response.data.id}`, {
            status: 'SUCCESS',
            wompiId: 'tx_fake_' + Date.now(),
        });

        dispatch(setTransactionResult(updated.data));
        toast.success('Pago realizado con éxito');
        navigate('/status');
        } catch (err: any) {
            toast.error('Ocurrió un error durante el pago');
        } finally {
            setLoading(false);
        }
    };

    const maskCard = (num: string) => '**** **** **** ' + num.slice(-4);

    return (
        <div className="p-4 max-w-md mx-auto text-center">
        {loading ? (
            <>
            <Loader />
            <p className="text-gray-600 mt-2">Procesando tu pago...</p>
            </>
        ) : (
            <>
            <h2 className="text-xl font-bold mb-4">Resumen de la compra</h2>
    
            <div className="space-y-2 text-sm text-left">
                <div>
                <strong>Producto:</strong> {selectedProduct.name}
                </div>
                <div>
                <strong>Precio base:</strong> ${selectedProduct.price}
                </div>
                <div>
                <strong>Tarifa de entrega:</strong> ${deliveryFee}
                </div>
                <div>
                <strong>Tarifa de servicio:</strong> ${baseFee}
                </div>
                <div>
                <strong>Total:</strong> ${total}
                </div>
                <div>
                <strong>Enviado a:</strong> {paymentData.address}, {paymentData.city}
                </div>
                <div>
                <strong>Correo:</strong> {paymentData.email}
                </div>
                <div>
                <strong>Tarjeta:</strong> {maskCard(paymentData.cardNumber)}
                </div>
            </div>
    
            <button
                className="w-full py-2 bg-green-600 text-white rounded mt-6 hover:bg-green-700"
                onClick={handlePayment}
            >
                Pagar ahora
            </button>
            </>
        )}
        </div>
    ); 
}