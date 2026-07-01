'use client';
import Image from "next/image";
import Link from "next/link";
import {FaStar, FaRegStar, FaStarHalfAlt} from 'react-icons/fa'; 
import { useState ,useEffect } from "react";


export default function ProductCard({product}) {

    const renderStars = (rating) =>{
        if(!rating) return null;

        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStar = 5 - fullStars - (hasHalfStar ? 1: 0); 

        return(
            <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_,i) =>(
                    <FaStar key={`full-${i}`} className="h-3 w-3 text-yellow-500"/>
                ))}
                {hasHalfStar && <FaStarHalfAlt className="h-3 w-3 text-yellow-500" />}
                {[...Array(emptyStar)].map((_,i) =>(
                    <FaStar key={`empty-${i}`} className="h-3 w-3 text-yellow-500"/>
                ))}
            </div>
        )
    }

    return(  
        <Link href={`/product/${product._id}`}>
          <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="relative h-48 w-full bg-gray-100">
                        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"/>
                        {product.originalPrice && (
                            <>
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} % OFF    
                                </span>
                            </>
                        )}
                        {product.stock !== undefined && (
                            <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded${product.stock > 0 ? 'bg-green-500 text-white':'bg-red-500 text-white'}`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        )}
                    </div>

                    <div className="p-4">
                        {product.brand && (
                            <span className="text-xs text-gray-600 uppercase tracking-wider">
                                {product.brand}
                            </span>
                        )}
                        <h3 className="font-semibold">{product.name}</h3>
                        {product.rating && (
                            <div className="flex items-center gap-1 mt-1">
                                {renderStars(product.rating)}
                                {product.numReviews && (
                                    <span className="text-xs text-gray-400">{product.numReviews}</span>
                                )}
                            </div>
                        )}
                        <div className="mt-2 ">
                            <span className="text-lg font-bold text-yellow-600">
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>   
        </Link>    
    )
}