'use client';
import Image from "next/image";
import Link from "next/link";
import { useState ,useEffect } from "react";

export default function ProductCard({product}) {

    return(  
        <Link href={`/product/${product._id}`}>
          <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
                     <div className="relative h-48 w-full bg-gray-100">
                        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"/>
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-yellow-600 font-bold">{product.price}</p>
                    </div>
                </div>   
        </Link>    
    )
}