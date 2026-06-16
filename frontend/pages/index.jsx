import {useEffect, useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { FaSignInAlt, FaEnvelope, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('../components/Home/Hero'), {ssr:false});
const ProductShowcase = dynamic(() => import('../components/Home/ProductShowcase'), {ssr:false});
const Reviews = dynamic(() => import('../components/Home/Reviews'), {ssr:false});




export default function Home() {

    

    return (
        <>
            <Hero />
            <ProductShowcase/>
            <Reviews/>
        </>
    );
}