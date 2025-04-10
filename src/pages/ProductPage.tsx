import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../features/transaction/transactionSlice";

export default function ProductPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { list: products, loading } = useAppSelector(state => state.product)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleSelect = (product: any) => {
        dispatch(setSelectedProduct(product))
        navigate('/payment')
    }

    return (
            <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Productos disponibles</h1>
        
            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <div className="grid gap-4">
                {products.map((product: any) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="font-bold text-indigo-600">${product.price}</p>
                    <p className="text-sm">Stock: {product.stock}</p>
                    <button
                        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        onClick={() => handleSelect(product)}
                    >
                        Seleccionar
                    </button>
                    </div>
                ))}
                </div>
            )}
            </div>
    );
}
