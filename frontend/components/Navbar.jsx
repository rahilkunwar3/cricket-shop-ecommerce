import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt, FaBars, FaTimes, FaShoppingCart, FaUserCircle, FaUser, FaClipboard } from "react-icons/fa";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true); // ← This will cause a warning but fixes hydration
    }, []);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        setIsMenuOpen(false);
        router.push("/");
    };

    // Base links that are ALWAYS shown (server and client agree)
    const baseLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About", href: "/about" },
    ];

    // Auth links shown only after mount
    const authLinks = [
        { name: "Tasks", href: "/tasks" },
        { name: "Cart", href: "/cart" },
        { name: "Orders", href: "/orders" },
    ];

    useEffect(() => {
        const fetchCartCount = async () => {
            if (!user) {
                setCartCount(0);
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:3001/api/cart", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setCartCount(data.totalItems || 0);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        };

        fetchCartCount();
    }, [user]);

    // All links - but auth links only show after mounted
    const allLinks = mounted && user ? [...baseLinks, ...authLinks] : baseLinks;

    return (
        <nav suppressHydrationWarning className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-1">
                        <Image 
                            src="/images/rahil_cricket_shop_logo.png" 
                            alt="Rahil Cricket Shop" 
                            width={49} 
                            height={14}
                            style={{ 
                                width: 'auto', 
                                height: 'auto',
                                objectFit: 'contain' 
                            }}
                        />                      
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-blue-800">CRICKET SHOP</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {allLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-600 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                
                    <div className="hidden md:flex items-center space-x-6">
                        <motion.button 
                            onClick={() => router.push("/cart")} 
                            className="relative" 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaShoppingCart className="w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors duration-200"/>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </motion.button>

                        {mounted && user ? (
                            <div className="relative">
                                <motion.button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)} 
                                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200" 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaUserCircle className="w-7 h-7"/>
                                </motion.button>
                        
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            exit={{ opacity: 0, y: -10 }} 
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>

                                            <Link 
                                                href="/profile" 
                                                onClick={() => setIsProfileOpen(false)} 
                                                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                <FaUser className="w-4 h-4" />
                                                <span>My Profile</span>
                                            </Link>

                                            <button 
                                                onClick={handleLogout} 
                                                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
                                            >
                                                <FaSignOutAlt className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            mounted && (
                                <motion.button 
                                    onClick={() => router.push("/login")} 
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200" 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>
                            )
                        )}
                        
                        
                        {!mounted && (
                            <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && mounted && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-gray-100"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {allLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium border-b border-gray-50"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                
                                <button
                                    onClick={() => {
                                        router.push("/cart");
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 border-b border-gray-50"
                                >
                                    <span>My Cart</span>
                                    {cartCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount > 99 ? "99+" : cartCount}
                                        </span>
                                    )}
                                </button>

                                {user ? (
                                    <div className="pt-2">
                                        <div className="flex items-center gap-3 py-3 border-b border-gray-50">
                                            <FaUserCircle className="w-10 h-10 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 py-3 text-gray-700 hover:text-blue-600 border-b border-gray-50"
                                        >
                                            <FaUser className="w-4 h-4" />
                                            <span>My Profile</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 py-3 text-red-600 hover:text-red-700 w-full text-left"
                                        >
                                            <FaSignOutAlt className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            router.push("/login");
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 mt-4"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}