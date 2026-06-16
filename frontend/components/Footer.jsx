'use client';

import { footer } from "framer-motion/client";
import { FaCcAmex, FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaPaypal, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from 'next/link'

export default function Footer(){
    const currentYear = new Date().getFullYear()

    return(
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-yellow-500">RAHIL CRICKET SHOP</h3>
                        <p className="text-gray-400 text-sm whitespace-pre-wrap">
                            Your one-stop destination for premium cricket equipment.
                            Quality products, fast delivery, and excellent custmer service.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
                                <svg>
                                <linearGradient id="insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#feda75" />
                                    <stop offset="25%" stopColor="#fa7e1e" />
                                    <stop offset="50%" stopColor="#d62976" />
                                    <stop offset="75%" stopColor="#962fbf" />
                                    <stop offset="100%" stopColor="#4f5bd5" />
                                </linearGradient>
                                </svg>
                            </div>

                            {/* Facebook */}
                            <a href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors duration-300">
                                <FaFacebook className="w-6 h-6" />
                            </a>

                            {/* Instagram (No translation class, perfectly centered by parent flex container) */}
                            <a 
                            href="#" 
                            className="text-gray-400 transition-colors duration-300 translate-y-[1px] [&_svg]:hover:fill-[url(#insta-grad)]"
                            >
                            <FaInstagram className="w-6 h-6" />
                            </a>

                            {/* Twitter */}
                            <a href="#" className="text-gray-400 hover:text-[#1DA1F2] transition-colors duration-300">
                                <FaTwitter className="w-6 h-6" />
                            </a>

                            {/* YouTube */}
                            <a href="#" className="text-gray-400 hover:text-[#FF0000] transition-colors duration-300">
                                <FaYoutube className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-yellow-500 mb-4">Quick Link</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/shop">Shop</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-yellow-500 mb-4">Customer Services</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/policy">Return Policy</Link></li>
                            <li><Link href="/policy">Shipping Info</Link></li>
                            <li><Link href="/policy">Privacy Policy</Link></li>
                            <li><Link href="/policy">Terms and Condition</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-yellow-500 mb-4">Get in Touch</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>rahilcricket@gmail.com</li>
                            <li>+9825165681</li>
                            <li>Pokhara, Nepal</li>
                        </ul>
                    </div>
                </div>
                <div className="flex gap-3 mt-4">
                            <FaCcVisa size={30} className="text-gray-500" />
                            <FaCcMastercard size={30} className="text-gray-500" />
                            <FaCcAmex size={30} className="text-gray-500" />
                            <FaPaypal size={30} className="text-gray-500" />
                    </div>

                    <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                        <p>&copy; {currentYear} RAHIL CRICKET SHOP. All rights reserved.</p>
                    </div>
            </div>
        </footer>
    )

}