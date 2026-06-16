'use client';
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
    const [step, setStep] = useState(1); // 1: Info, 2: OTP, 3: Complete
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const { register } = useAuth();
    const router = useRouter();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    // Send OTP
    const sendOTP = async () => {
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name })
            });
            const data = await response.json();

            if (response.ok) {
                setTimer(60);
                startTimer();
                setStep(2);
                setError("");
            } else {
                setError(data.message || "Failed to send OTP");
            }
        } catch (error) {
            setError("Error sending OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Start countdown timer
    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Verify OTP
    const verifyOTP = async () => {
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            });
            const data = await response.json();

            if (response.ok) {
                setStep(3);
                setError("");
            } else {
                setError(data.message || "Invalid OTP");
            }
        } catch (error) {
            setError("Error verifying OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const resendOTP = async () => {
        if (timer > 0) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3001/api/otp/resend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name })
            });
            const data = await response.json();

            if (response.ok) {
                setTimer(60);
                startTimer();
                setError("");
            } else {
                setError(data.message || "Failed to resend OTP");
            }
        } catch (error) {
            setError("Error resending OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Final registration
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        

        if(!(validatePassword(password))){
            setError("Password show be atleast 8 character with one uppercase, one lowercase, one number and one special character");
            return;
        }

        setLoading(true);
        setError("");

        const result = await register(name, email, password);
        
        if (result.success) {
            router.push("/");
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const cardVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: "spring", duration: 0.6 } }
    };

    const stepVariants = {
        enter: { x: 100, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4"
        >
            <motion.div
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
            >
                <AnimatePresence mode="wait">
                    {/* Step 1: User Info */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                                <p className="text-gray-500 text-sm mt-1">Enter your details to get started</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Create a password"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={sendOTP}
                                disabled={loading}
                                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg"
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </motion.button>

                            <div className="mt-6 text-center">
                                <p className="text-gray-500 text-sm">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-blue-500 font-semibold hover:text-blue-700">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-800">Verify Email</h1>
                                <p className="text-gray-500 text-sm mt-1">Enter the OTP sent to {email}</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2 text-center">
                                    Enter 6-digit OTP
                                </label>
                                <div className="flex justify-center">
                                    <input
                                        type="text"
                                        maxLength="6"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-40 text-center text-2xl font-bold py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="000000"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={verifyOTP}
                                disabled={loading || otp.length !== 6}
                                className="w-full  bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg mb-3"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </motion.button>

                            <div className="text-center">
                                <motion.button
                                    whileHover={{ scale: timer > 0 ? 1 : 1.02 }}
                                    whileTap={{ scale: timer > 0 ? 1 : 0.98 }}
                                    onClick={resendOTP}
                                    disabled={timer > 0}
                                    className="text-sm  bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg mb-3"
                                >
                                    {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Complete Registration */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                                <h1 className="text-2xl font-bold text-gray-800">Email Verified!</h1>
                                <p className="text-gray-500 text-sm mt-1">Your email has been verified successfully</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleRegister}
                                disabled={loading}
                                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg"
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}