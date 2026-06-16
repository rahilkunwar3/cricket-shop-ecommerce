'use client';
import {delay, motion, scale} from "framer-motion";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image";
import CountUp from "react-countup"
import { useState, useEffect, useRef } from "react";
import { useMemo } from "react";
export default function Hero() {
    const { user } = useAuth();

        // Use fixed, deterministic particle positions (no randomness)
    const particles = [
        { width: 120, height: 120, left: "10%", top: "20%", duration: 12 },
        { width: 80, height: 80, left: "70%", top: "15%", duration: 15 },
        { width: 150, height: 150, left: "85%", top: "60%", duration: 18 },
        { width: 60, height: 60, left: "20%", top: "75%", duration: 10 },
        { width: 100, height: 100, left: "45%", top: "40%", duration: 14 },
        { width: 90, height: 90, left: "60%", top: "85%", duration: 20 },
    ];


    // Animate Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.3 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 20 } },
    };

    const buttonVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: {opacity: 1, scale: 1, transition: {delay: 0.3, type: "spring", stiffness: 100}},
    };

    const imageVariants = {
        hidden: {opacity: 0, x: 100, rotate: -10},
        visible: {opacity: 1, x: 0, rotate: 0, transition: {duration: 0.8, delay: 0.3, type: "spring", stiffness: 100}},
    };

    const floatingAnimation = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const pulseAnimation = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }


    return (
        <section className="relative min-h-screen flex items-center">
            <motion.div
             className="absolute inset-0 z-0"
             initial={{scale: 1.1}}
             animate={{scale: 1}}
             transition={{duration: 8, ease: "easeOut"}}>
                <Image
                src="/images/hero_image.jpg"
                alt="Cricket background"
                fill
                className="object-cover"
                priority
                />
                {/*Animated Overlay */}
                <motion.div
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1.5}}
                />
            </motion.div>

            {/* Animated Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle, i) => (
                    <motion.div
                    key={i}
                    className="absolute bg-white rounded-full opacity-30"
                    style={{
                        width: particle.width,
                        height: particle.height,
                        left: particle.left,
                        top: particle.top
                    }}

                    animate={{
                        y: [0, -50, 0],
                        x: [0, 30, 0],
                        rotate: [0, 360, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-2 w-full">
                <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid lg:grid-cols-2 gap-12 items-center">
                    {/*Left Side - Text*/}
                    <div>
                        <div variants={textVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                            <motion.div className="text-2xl font-bold md:text-3xl mb-2 tracking-wider " animate={{opacity: [0.5, 1, 0.5]}} transition={{duration: 2, repeat:Infinity}}>
                                WELCOME TO
                            </motion.div>
                            <motion.div className="text-4xl md:text-6xl text-yellow-400" animate={pulseAnimation.animate}>
                                RAHIL CRICKET SHOP
                            </motion.div>
                        </div>

                        <motion.p variants={textVariants} className="text-lg md:text-xl font-semibold mt-6 mb-8 text-gray-200">
                            Discover the gold standard of cricket equipment. Handcrafted for those who demand absolute precision and unrivaled power on the pitch.
                        </motion.p>

                        <motion.div variants={buttonVariants} className="flex gap-4 justify-start flex-wrap">
                            <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                                <Link href="/shop" className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition shadow-md">
                                    Shop Now →
                                </Link>
                            </motion.div>
                            {!user && (
                                <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                                    <Link href="/register" className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition">
                                    Create Account
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div variants={textVariants} className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/20">
                            <div>
                               <span>
                                    <CountUp start={500} end={1000} duration={4} className="text-2xl font-bold text-white"/>
                                    <span className="text-orange-500 text-2xl font-bold">+</span>
                               </span>
                                <p className="text-tm text-[rgb(140,139,139)]">
                                    Happy Customers
                                </p>
                            </div>
                            <div>
                                <span>
                                    <CountUp start={10} end={50} duration={4} className="text-2xl font-bold text-white"/>
                                    <span className="text-orange-500 text-2xl font-bold">+</span>
                                </span>
                                <p className="text-tm text-[rgb(140,139,139)]">
                                    Cricket Brands
                                </p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    24/7
                                </p>
                                <p className="text-tm text-[rgb(140,139,139)]">
                                    Support
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
