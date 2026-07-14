import { useState, useEffect, useMemo } from "react"
import { productAPI } from "../services/api"
import ProductCard from "../components/Product/ProductCard";

export default function Shop() {
    const[loading, setLoading] = useState(true);
    const[products, setProducts] = useState([]);
    const[selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        {id: 'all', name: 'All Products'},
        {id: 'Bats', name: 'Bats'},
        {id: 'Balls', name: 'Balls'},
        {id: 'Gloves', name: 'Gloves'},
        {id: 'Stumps', name: 'Stumps'},
        {id: 'Protective Gear', name: 'Protective Gear'},
        {id: 'Clothing', name: 'Clothing'},
        {id: 'Footwear', name: 'Footwear'},
        {id: 'Accessories', name: 'Accessories'}
    ]
    
        useEffect (() =>{
            const LoadProducts = async () => {
                try{
                    const response = await productAPI.getAllProducts();
                    setProducts(response.data);
                    setLoading(false);
                } catch(error){
                    console.error('Error loading products:', error)
                    setLoading(false);
                }
            };
            LoadProducts();
        }, []);

        const filteredProducts = useMemo(() =>{
            if (selectedCategory === 'all'){
                return products;
            }
            return products.filter((product) => product.category ===  selectedCategory);
        }, [selectedCategory, products])
    

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

    return(
    <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
                All Cricket Products
            </h1>
        
            <p className="text-center text-gray-500 mb-8">
                Showing {filteredProducts.length} of {products.length} premium items for your Cricket needs
            </p>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>

            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${selectedCategory == category.id ? "bg-yellow-500 text-white shadow-md": "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            
            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No product in the category</p>
                </div>
            ):(<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
            )}
        </div>
    </div>
    )
}