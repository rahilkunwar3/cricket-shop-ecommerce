// Updated: Added API integration
'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { productAPI } from "@/services/api"

export default function ProductShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [cardsPerView, setCardsPerView] = useState(3);
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await productAPI.getAllProducts();
                const fetchedProducts = response.data.slice(0, 6);
                setProducts(fetchedProducts);
                setCurrentIndex(fetchedProducts.length);
                setLoading(false);
            } catch (error) {
                console.error("Error loading products:", error);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const extendedProducts = products.length > 0 
        ? [...products, ...products, ...products] 
        : [];
    const TOTAL = products.length;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setCardsPerView(3);
            else if (window.innerWidth >= 768) setCardsPerView(2);
            else setCardsPerView(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTransitionEnd = () => {
        if (!products.length) return;
        if (currentIndex >= TOTAL * 2) {
            setIsAnimating(false);
            setCurrentIndex(currentIndex - TOTAL);
        } else if (currentIndex < TOTAL) {
            setIsAnimating(false);
            setCurrentIndex(currentIndex + TOTAL);
        }
    };

    useEffect(() => {
        if (!isAnimating) {
            const t = setTimeout(() => setIsAnimating(true), 20);
            return () => clearTimeout(t);
        }
    }, [isAnimating]);

    useEffect(() => {
        if (isHovered || !products.length) return;
        const interval = setInterval(() => {
            setIsAnimating(true);
            setCurrentIndex(prev => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovered, products.length]);

    const prevSlide = () => {
        setIsAnimating(true);
        setCurrentIndex(prev => prev - 1);
    };

    const nextSlide = () => {
        setIsAnimating(true);
        setCurrentIndex(prev => prev + 1);
    };

    const cardWidth = 100 / cardsPerView;
    const offset = -(currentIndex * cardWidth);

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </section>
        );
    }

    if (!products.length) return null;

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1f3e72] mb-2">Featured Products</h2>
                    <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
                </motion.div>

                <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#1f3e72] hover:bg-blue-800 text-white p-3 rounded-full transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#1f3e72] hover:bg-blue-800 text-white p-3 rounded-full transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div className="overflow-hidden mx-10">
                        <div
                            className="flex"
                            style={{
                                transform: `translateX(${offset}%)`,
                                transition: isAnimating ? 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {extendedProducts.map((product, idx) => (
                                <div
                                    key={`${product._id}-${idx}`}
                                    style={{ width: `${cardWidth}%` }}
                                    className="flex-shrink-0 px-4"
                                >
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">{product.category}</span>
                                            </div>
                                            {product.originalPrice && (
                                                <div className="absolute top-4 right-4 z-10">
                                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Save ₹{product.originalPrice - product.price}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-center h-full p-4">
                                                <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-full object-contain rounded-lg" />
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-yellow-600 font-semibold">{product.brand}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-2xl font-bold text-yellow-600">₹{product.price}</span>
                                                {product.originalPrice && <span className="text-gray-400 line-through">₹{product.originalPrice}</span>}
                                            </div>
                                            <Link href={`/product/${product._id}`}>
                                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                                                    View Details
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-2 mt-8">
                            {products.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setIsAnimating(true);
                                        setCurrentIndex(idx + TOTAL);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        (currentIndex - TOTAL + TOTAL * 2) % TOTAL === idx
                                        ? "w-8 bg-yellow-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300"
                                >
                                    View All Products →
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}