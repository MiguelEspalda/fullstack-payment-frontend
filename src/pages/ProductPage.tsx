import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../features/transaction/transactionSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

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
                <Loader />
            ) : (
                <div className="grid gap-4">
                {products.map((product: any) => (
                        <ProductCard
                        key={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        stock={product.stock}
                        onClick={() => handleSelect(product)}
                    />
                ))}
                </div>
            )}
            </div>
    );
}
