import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { clearTransaction } from "../features/transaction/transactionSlice";

export default function StatusPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const transaction = useAppSelector(state => state.transaction.transactionResult);

    useEffect(() => {
        if (!transaction) {
        navigate('/');
        return;
        }

        const timeout = setTimeout(() => {
        dispatch(clearTransaction());
        navigate('/');
        }, 5000);

        return () => clearTimeout(timeout);
    }, [transaction, dispatch, navigate]);

    if (!transaction) return null;

    return (
        <div className="p-4 max-w-md mx-auto text-center">
        {transaction.status === 'SUCCESS' ? (
            <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">¡Pago exitoso!</h2>
            <p className="mb-4">Tu pedido ha sido registrado con éxito.</p>
            </>
        ) : (
            <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Pago fallido</h2>
            <p className="mb-4">Intenta nuevamente más tarde.</p>
            </>
        )}

        <p className="text-sm">
            ID de transacción: <strong>{transaction.id}</strong>
        </p>
        <p className="text-sm">Redirigiendo en 5 segundos...</p>
        </div>
    );
}
