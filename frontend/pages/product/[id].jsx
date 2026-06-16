import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { productAPI } from "../../services/api";

export default function ProductDetails(){
    const router = useRouter();
    const {id} = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() =>{
        if (id){  
            const loadProduct = async () => {
                try{
                    setLoading(true);
                    const response = await productAPI.getProductsbyId(id);
                    console.log("Full response:", response);  // ← Add this
                    console.log("Product data:", response.data);  // ← Add this
                    setProduct(response.data);
                    setError(null);
                } catch(err){
                    console.error('Error while showing product:',err);
                    setError('Product not found');
                } finally{
                    setLoading(false);
                }
            };
            loadProduct();
        }
    }, [id])


    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);

    }

    if (loading){
        return(
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full  h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading cricket gears...</p>
                </div>
            </div>
        )
    }

    if(error){
        return(
            <div className="flex justify-center items-center h-[60vh]">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    if(!product){
        return null;
    }

    return(
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                {product.image && product.image !== "" ?(
                <div className="relative h-80 w-80 mb-6 bg-gray-100 rounded-lg shadow overflow-hidden">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"/>
                </div>
                ):(
                    <div className="h-80 w-full mb-6 bg-gray-200 rounded-lg shadow overflow-hidden flex justify-center items-center">
                        <span className="text-gray-400">No Image available</span>
                    </div>
                )}

                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="texxt-gray-600 mt-2">{product.description}</p>
                <p className="text-2xl font-bold text-yellow-600 mt-4">₹{product.price}</p>

                {product.category && (
                    <p className="text-gray-500 mt-2">Category: {product.category}</p>
                )}

                {product.brand && (
                    <p className="text-gray-500">Brand: {product.brand}</p>
                )}
            </div>
        </div>
    )
}