'use client'
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Ashish Thapa",
        location: "Baglung, Nepal",
        rating: 5,
        text: "Absolutely love my new cricket bat! The quality is outstanding and delivery was super fast. Best purchase I've made for my cricket gear.",
        date: "2 weeks ago",
        avatar: "/images/person1_image.jpg",
        verified: true
    },
    {
        id: 2,
        name: "Shila Acharya",
        location: "Pokhara, Nepal",
        rating: 5,
        text: "The batting gloves are incredibly comfortable and provide excellent grip. Highly recommend this shop for authentic cricket equipment!",
        date: "1 month ago",
        avatar: "/images/person2_image.jpg",
        verified: true
    },
    {
        id: 3,
        name: "Bibek Poudel",
        location: "Pokhara, Nepal",
        rating: 4,
        text: "Great collection of cricket items. The helmet quality is top-notch. Will definitely shop here again!",
        date: "3 weeks ago",
        avatar: "/images/person3_image.jpeg",
        verified: true
    },
    {
        id: 4,
        name: "Bipin Thapa",
        location: "Pokhara, Nepal",
        rating: 5,
        text: "Best cricket shop online! The jersey fits perfectly and the material is high quality. Excellent customer service too.",
        date: "1 week ago",
        avatar: "/images/person4_image.jpg",
        verified: true
    },
    {
        id: 5,
        name: "Subhodh Man Singh Bhandari",
        location: "Pokhara, Nepal",
        rating: 5,
        text: "Ordered cricket shoes for my son. They arrived in perfect condition and he loves them! Very happy with the purchase.",
        date: "2 weeks ago",
        avatar: "/images/person5_image.jpeg",
        verified: true
    },
    {
        id: 6,
        name: "Roshan Bhandari",
        location: "Pokhara, Nepal",
        rating: 4,
        text: "Good quality products at reasonable prices. The delivery was on time. Would recommend to fellow cricketers.",
        date: "3 weeks ago",
        avatar: "/images/person6_image.jpg",
        verified: true
    },
    {
        id: 7,
        name: "Rajesh Adhikari",
        location: "Pokhara, Nepal",
        rating: 5,
        text: "The protective gear is excellent! Feels very safe while playing. Great customer support as well.",
        date: "1 month ago",
        avatar: "/images/person7_image.jpg",
        verified: true
    },
    {
        id: 8,
        name: "Sachin Dev Ale",
        location: "Pokhara, Nepal",
        rating: 5,
        text: "Fantastic experience shopping here. The products are genuine and prices are competitive. Will buy again!",
        date: "2 weeks ago",
        avatar: "/images/person8_image.jpg",
        verified: true
    }
];

const duplicateReviews = [...reviews, ...reviews, ...reviews, ...reviews]

const StarRating = ({rating}) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return(
        <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 text-yellow-500"/>
            ))}
            {hasHalfStar && <FaStarHalfAlt className="w-4 h-4 text-yellow-500"/>}
            {[...Array(5 - Math.ceil(rating))].map((_,i) => (
                <FaRegStar key={i} className="w-4 h-4 text-gray-300"/>
            ))}
        </div>
    );
};

const ReviewCard = ({review}) => {
    return(
        <div className="w-[380px] md:w-[420px] flex-shrink-0 bg-white rounded-2xl hover:shadow-2xl transition-all duration-300 p-6 mx-3">
            <FaQuoteLeft className="w-8 h-8 text-yellow-500 opacity-50 mb-4"/>

            <p className="text-gray-600 mb-4 line-clamp-4 leading-relaxed hyphens-auto">
                {review.text}
            </p>

            <div className="mb-4">
                <StarRating rating={review.rating}/>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">

                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-500 flex-shrink-0">
                {review.avatar ? (
                     <Image 
                        src={review.avatar} 
                        alt={review.name} 
                        fill 
                        sizes="48px" 
                        className="object-cover"
                    />
                ):(
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                        {review.name.charAt(0)}
                    </div>
                )}
                </div>

                <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">{review.location}</span>
                        {review.verified && (
                            <span className="text-green-500 text-xs bg-green-50 px-2 py-0.5 rounded-full">
                                ✓ Verified
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                </div>
            </div>
        </div>
    )
};

const MarqueeRow = ({ reviewsList, direction='left', speed= 0.5 }) => {
    const marqueeRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const animationRef = useRef(null);
    const positionRef = useRef(direction === 'left' ? 0 : -reviewsList.length * 440/2);

    useEffect(() => {
        const animate = () => {
            if (!isHovered){
                if (direction === 'left'){
                    positionRef.current -= speed;
                    if (positionRef.current <= -reviewsList.length * 440/2){
                        positionRef.current = 0;
                    } 
                } else {
                    positionRef.current += speed;
                    if (positionRef.current >= 0){
                        positionRef.current = -reviewsList.length * 440/2;
                    }
                }
                if (marqueeRef.current){
                    marqueeRef.current.style.transform = `translateX(${positionRef.current}px)`;
                }
            }
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current){
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [direction, speed, reviewsList.length, isHovered ]);

    return(
        <div className="overflow-hidden py-4" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div ref={marqueeRef} className="flex  will-change-transform">
                {reviewsList.map((review, idx) => (
                    <ReviewCard key={`${review.id}-${idx}`} review={review}/>
                ))}
            </div>
        </div>
    );
};

export default function Reviews(){
    const [stats, setStats] = useState({
        averageRating: 4.8,
        totalReviews: reviews.length,
        satisfiedCustomers: '98%' 
    });

    return(
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{duration:0.6}} viewport={{once: true}} className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1f3e72] mb-2">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Join thousands of satisfied cricketers who trust RAHIL CRICKET SHOP
                    </p>
                    <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
                </motion.div>

                {/* Stats Section */}
                <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity:1, y:0}} transition={{delay:0.2}} viewport={{once:true}} className="flex justify-center gap-8 mt-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-500">
                            {stats.averageRating}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Average Rating
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-500">
                            {stats.totalReviews}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Customer Reviews
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-500">
                            {stats.satisfiedCustomers}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Satisfied Customers
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="space-y-8">
                <MarqueeRow reviewsList={duplicateReviews} direction="right" speed={0.4}/>
                <MarqueeRow reviewsList={duplicateReviews} direction="left" speed={0.4}/>
            </div>

            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay:0.4}} viewport={{once:true}} className="text-center mt-12">
                <div className="flex justify-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>100% Authentic Products</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Secured Payments</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Fast Delivery</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-green-500">✓</span>
                        <span>Customer Support</span>
                    </div>

                </div>
            </motion.div>
        </section>
    )
}