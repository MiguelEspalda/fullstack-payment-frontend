interface Props {
    name: string;
    description: string;
    price: number;
    stock: number;
    onClick: () => void;
}

export default function ProductCard({
    name,
    description,
    price,
    stock,
    onClick,
    }: Props) {
    return (
        <div
        className="border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer bg-white"
        onClick={onClick}
        >
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex justify-between mt-3 items-center">
            <span className="text-indigo-600 font-bold">${price}</span>
            <span className="text-sm text-gray-500">Stock: {stock}</span>
        </div>
        </div>
    );
}
