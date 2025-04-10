import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import API from "../services/api";
import { useState } from "react";
import { setTransactionResult } from "../features/transaction/transactionSlice";


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
            customerEmail: paymentData.name + '@fake.com', // simulación
            deliveryInfo: `${paymentData.address}, ${paymentData.city}`,
            amount: total,
        });

        // simular éxito inmediato
        const updated = await API.put(`/transactions/${response.data.id}`, {
            status: 'SUCCESS',
            wompiId: 'tx_fake_' + Date.now(),
        });

        dispatch(setTransactionResult(updated.data));
        navigate('/status');
        } catch (err) {
        alert('Ocurrió un error durante el pago');
        } finally {
        setLoading(false);
        }
    };

    const maskCard = (num: string) => '**** **** **** ' + num.slice(-4);

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Resumen de la compra</h2>

        <div className="space-y-2 text-sm">
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
            <strong>Tarjeta:</strong> {maskCard(paymentData.cardNumber)}
            </div>
        </div>

        <button
            className="w-full py-2 mt-6 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handlePayment}
            disabled={loading}
        >
            {loading ? 'Procesando...' : 'Pagar ahora'}
        </button>
        </div>
    );
}