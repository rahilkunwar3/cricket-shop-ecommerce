const mongoose = require('mongoose');
const Product = require('./models/product');
const user = require('./models/user');
require('dotenv').config();

const YOUR_USER_ID = '6a19dfa1dd56cbe371318926'; // Replace with an actual user ID from your database

const products = [
    // Bats
    {
        name: "Premium English Willow Bat",
        description: "Handcrafted English willow cricket bat with excellent balance and power. Perfect for professional players.",
        price: 4999.99,
        originalPrice: 5999.99,
        category: "Bats",
        brand: "SS",
        image: "/images/premium_english_willow_bat.jpg",
        stock: 25,
        numReviews: 45,
        rating: 4.8,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Kashmir Willow Bat",
        description: "Durable Kashmir willow bat ideal for beginners and club level cricket. Great value for money.",
        price: 1999.99,
        originalPrice: 2499.99,
        category: "Bats",
        brand: "SS",
        image: "/images/super-power-kw.jpg",
        stock: 50,
        numReviews: 128,
        rating: 4.3,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Junior Cricket Bat",
        description: "Lightweight bat designed for young cricketers. Perfect for training and matches.",
        price: 1299.99,
        originalPrice: 1599.99,
        category: "Bats",
        brand: "GM",
        image: "/images/654dc598973d8305817590e1-gm-diamond-303-junior-cricket-bat-2021.jpg",
        stock: 40,
        numReviews: 32,
        rating: 4.5,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Pro League Cricket Bat",
        description: "Professional grade bat used by international players. Premium quality willow.",
        price: 7999.99,
        originalPrice: 9999.99,
        category: "Bats",
        brand: "HRS",
        image: "/images/pro-league-willow-bat-662.jpg",
        stock: 10,
        numReviews: 89,
        rating: 4.9,
        isAvailable: true,
        userId: YOUR_USER_ID
    },

    // Balls
    {
        name: "Official Match Cricket Ball",
        description: "Premium white leather cricket ball approved for odi and t20 matches. Perfect seam and shine.",
        price: 899.99,
        originalPrice: 1099.99,
        category: "Balls",
        brand: "Kookaburra",
        image: "/images/leather_cricket_ball.webp",
        stock: 100,
        numReviews: 67,
        rating: 4.7,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Practice Cricket Ball",
        description: "Durable practice ball for net sessions. Great for training and drills.",
        price: 199.99,
        originalPrice: 299.99,
        category: "Balls",
        brand: "SG",
        image: "/images/SG-I-ball.jpg",
        stock: 200,
        numReviews: 156,
        rating: 4.2,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Tennis Cricket Ball",
        description: "Soft tennis ball for casual and tape ball cricket. Perfect for street cricket.",
        price: 49.99,
        originalPrice: 79.99,
        category: "Balls",
        brand: "Cosco",
        image: "/images/cosco-cricket-ball-500x500.webp",
        stock: 500,
        numReviews: 234,
        rating: 4.6,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Pink Cricket Ball",
        description: "High-visibility pink ball for day-night matches. Professional quality.",
        price: 999.99,
        originalPrice: 1299.99,
        category: "Balls",
        brand: "Dukes",
        image: "/images/dukes_ball_pink.jpg",
        stock: 50,
        numReviews: 28,
        rating: 4.8,
        isAvailable: true,
        userId: YOUR_USER_ID
    },

    // Gloves
    {
        name: "Professional Batting Gloves",
        description: "Premium batting gloves with extra padding and sweat-resistant material.",
        price: 1299.99,
        originalPrice: 1699.99,
        category: "Gloves",
        brand: "SS",
        image: "/images/professional_batting_gloves.jpg",
        stock: 60,
        numReviews: 89,
        rating: 4.6,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Wicket Keeping Gloves",
        description: "Professional wicket keeping gloves with superior grip and finger protection.",
        price: 1599.99,
        originalPrice: 1999.99,
        category: "Gloves",
        brand: "Puma",
        image: "/images/wicket_keeping_gloves_puma.jpg",
        stock: 35,
        numReviews: 54,
        rating: 4.7,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Junior Batting Gloves",
        description: "Lightweight gloves designed for young cricketers. Comfortable and protective.",
        price: 699.99,
        originalPrice: 899.99,
        category: "Gloves",
        brand: "GM",
        image: "/images/Gunn-Moore-GM-Siren-606-Batting-Gloves-Youth.webp",
        stock: 45,
        numReviews: 34,
        rating: 4.4,
        isAvailable: true,
        userId: YOUR_USER_ID
    },

    // Protective Gear
    {
        name: "Premium Cricket Helmet",
        description: "ISI certified helmet with steel grill and adjustable fit. Maximum protection.",
        price: 2499.99,
        originalPrice: 2999.99,
        category: "Protective Gear",
        brand: "SG",
        image: "/images/cricket_helmet_sg.jpg",
        stock: 30,
        numReviews: 76,
        rating: 4.8,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Leg Pads",
        description: "Lightweight leg guards with excellent protection and comfort. Perfect for all formats.",
        price: 1899.99,
        originalPrice: 2299.99,
        category: "Protective Gear",
        brand: "SS",
        image: "/images/leg_guard_SS.jpg",
        stock: 55,
        numReviews: 43,
        rating: 4.5,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Arm Guard",
        description: "Protective arm guard for batsmen. Shock-absorbing technology.",
        price: 399.99,
        originalPrice: 499.99,
        category: "Protective Gear",
        brand: "SG",
        image: "/images/arm_guard_SG.jpg",
        stock: 80,
        numReviews: 29,
        rating: 4.3,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Chest Guard",
        description: "Professional chest guard for batsmen facing fast bowlers.",
        price: 799.99,
        originalPrice: 999.99,
        category: "Protective Gear",
        brand: "Gray-Nicolls",
        image: "/images/chest_guard_gray_nicollas.jpg",
        stock: 40,
        numReviews: 22,
        rating: 4.4,
        isAvailable: true,
        userId: YOUR_USER_ID
    },

    // Clothing
    {
        name: "Nepal Cricket Jersey",
        description: "Breathable, moisture-wicking cricket jersey. Perfect for matches and practice.",
        price: 999.99,
        originalPrice: 1299.99,
        category: "Clothing",
        brand: "KELMI",
        image: "/images/cricket_jersey_nepal.jpg",
        stock: 120,
        numReviews: 145,
        rating: 4.7,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Cricket Pants",
        description: "Comfortable white cricket pants with stretch fabric. Ideal for long innings.",
        price: 799.99,
        originalPrice: 999.99,
        category: "Clothing",
        brand: "Adidas",
        image: "/images/adidas_cricket_pants.jpg",
        stock: 90,
        numReviews: 67,
        rating: 4.5,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Training T-Shirt",
        description: "Lightweight training t-shirt for practice sessions. Quick-dry fabric.",
        price: 399.99,
        originalPrice: 499.99,
        category: "Clothing",
        brand: "Puma",
        image: "/images/PumaCricketWhitesShirt_c9058a6e-7573-4596-a8a2-c0ff1a8ff1fd.webp",
        stock: 150,
        numReviews: 98,
        rating: 4.4,
        isAvailable: true,
        userId: YOUR_USER_ID
    },

    // Footwear
    {
        name: "Cricket Shoes - Spiked",
        description: "Professional spiked shoes for excellent grip on turf. Premium comfort.",
        price: 2999.99,
        originalPrice: 3599.99,
        category: "Footwear",
        brand: "SG",
        image: "/images/sierra-spike.jpg",
        stock: 45,
        numReviews: 56,
        rating: 4.6,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Cricket Shoes - Rubber Sole",
        description: "Multi-purpose shoes with rubber sole for artificial and mat wickets.",
        price: 1999.99,
        originalPrice: 2499.99,
        category: "Footwear",
        brand: "SS",
        image: "/images/cricket_shoes_ss.jpg",
        stock: 60,
        numReviews: 78,
        rating: 4.4,
        isAvailable: true,
        userId: YOUR_USER_ID
    },

    // Accessories
    {
        name: "Cricket Kit Bag",
        description: "Large wheeled kit bag that fits all your cricket gear. Durable and spacious.",
        price: 3499.99,
        originalPrice: 4299.99,
        category: "Accessories",
        brand: "Gray-Nicolls",
        image: "/images/cricket_kit_gray_nicollas.jpg",
        stock: 25,
        numReviews: 89,
        rating: 4.9,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Sunglasses for Cricket",
        description: "Polarized sunglasses for better visibility in bright conditions.",
        price: 1299.99,
        originalPrice: 1599.99,
        category: "Accessories",
        brand: "Oakley",
        image: "/images/oakley-sunglasses-default-title-oakley-encoder-strike-prizm-road-cricket-sunglasses-37990573867188.webp",
        stock: 40,
        numReviews: 34,
        rating: 4.7,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Cricket Wrist Band",
        description: "Sweat-absorbing wrist band for comfort during long innings.",
        price: 99.99,
        originalPrice: 149.99,
        category: "Accessories",
        brand: "Generic",
        image: "/images/cricket_wrist_band_generic.jpg",
        stock: 200,
        numReviews: 123,
        rating: 4.2,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "Grip Tape",
        description: "High-quality bat grip tape for better control and shock absorption.",
        price: 49.99,
        originalPrice: 69.99,
        category: "Accessories",
        brand: "SS",
        image: "/images/ss_cricket_grip.webp",
        stock: 300,
        numReviews: 89,
        rating: 4.3,
        isAvailable: true,
        userId: YOUR_USER_ID
    },

    // Stumps
    {
        name: "Complete Stumps Set",
        description: "3 stumps and 2 bails set made of wood perfect of cricket match.",
        price: 599.99,
        originalPrice: 799.99,
        category: "Stumps",
        brand: "Kookaburra",
        image: "/images/complete_stump_set_kookaburra.jpg",
        stock: 50,
        numReviews: 67,
        rating: 4.5,
        isAvailable: true,
        userId: YOUR_USER_ID
    },
    {
        name: "LED Stumps Set",
        description: "Electronic stumps that light up on impact. Professional quality.",
        price: 4999.99,
        originalPrice: 5999.99,
        category: "Stumps",
        brand: "Zing",
        image: "/images/LED_Stumps_set_zing.jpg",
        stock: 15,
        numReviews: 23,
        rating: 4.8,
        isAvailable: true,
        userId: YOUR_USER_ID
    }
];

const seedDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricketshop';
        await mongoose.connect(MONGODB_URI);
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log(`✅ ${products.length} cricket products seeded successfully with original prices!`);
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();