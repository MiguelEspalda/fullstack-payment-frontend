import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPaymentData } from "../features/transaction/transactionSlice";

export default function PaymentInfoPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const selectedProduct = useAppSelector(state => state.transaction.selectedProduct)

    const [form, setForm] = useState({
        name: '',
        address: '',
        city: '',
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    })

    const [errors, setErrors] = useState<any>({});

    if (!selectedProduct) {
        navigate('/');
        return null;
    }

    const getCardType = (number: string) => {
        if (/^4/.test(number)) return 'VISA';
        if (/^5[1-5]/.test(number)) return 'MasterCard';
        return 'Desconocida';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: any = {};
        if (!form.name) newErrors.name = 'Requerido';
        if (!form.address) newErrors.address = 'Requerido';
        if (!form.city) newErrors.city = 'Requerido';
        if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Correo inválido';
        if (!/^\d{16}$/.test(form.cardNumber)) newErrors.cardNumber = 'Número inválido';
        if (!/^\d{3}$/.test(form.cvc)) newErrors.cvc = 'CVC inválido';
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = 'Formato mm/yy';
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
        setErrors(validationErrors);
        return;
        }

        dispatch(setPaymentData(form));
        navigate('/summary');
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Información de Pago y Entrega</h2>

        <div className="space-y-4">
            <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
            type="text"
            name="address"
            placeholder="Dirección"
            className="w-full p-2 border rounded"
            value={form.address}
            onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

            <input
            type="text"
            name="city"
            placeholder="Ciudad"
            className="w-full p-2 border rounded"
            value={form.city}
            onChange={handleChange}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

            <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
            type="text"
            name="cardNumber"
            placeholder="Número de tarjeta"
            className="w-full p-2 border rounded"
            maxLength={16}
            value={form.cardNumber}
            onChange={handleChange}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

            <div className="text-sm text-gray-600">
            Tipo de tarjeta: <strong>{getCardType(form.cardNumber)}</strong>
            </div>

            <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className="w-full p-2 border rounded"
            value={form.expiry}
            onChange={handleChange}
            />
            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}

            <input
            type="text"
            name="cvc"
            placeholder="CVC"
            className="w-full p-2 border rounded"
            maxLength={3}
            value={form.cvc}
            onChange={handleChange}
            />
            {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}

            <button
            className="w-full py-2 bg-indigo-600 text-white rounded mt-2 hover:bg-indigo-700"
            onClick={handleSubmit}
            >
            Continuar al resumen
            </button>
        </div>
        </div>
    );
}