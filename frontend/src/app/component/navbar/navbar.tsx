"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInitial, setUserInitial] = useState("C");
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail");
        
        if (token !== null) {
            setIsLoggedIn(true);
            if (userEmail) {
                setUserInitial(userEmail.charAt(0).toUpperCase());
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setShowDropdown(false);
        router.push("/");
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={styles.navbar}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logoLink}>
                        <img src="/logo.png" alt="logo" className={styles.logo}/>
                    </Link>
                    
                    <div className={styles.menu}>
                        <Link href="/product" className={styles.menuLink}>Product</Link>
                        <Link href="/developer" className={styles.menuLink}>Developer</Link>
                        <Link href="/faq" className={styles.menuLink}>FAQ</Link>
                        <Link href="/company" className={styles.menuLink}>Company</Link>
                        <Link href="/pricing" className={styles.menuLink}>Pricing</Link>
                    </div>
                </div>

                <div className={styles.right}>
                    <Link href="/contact" className={styles.contactLink}>
                        Contact
                    </Link>
                    
                    {isLoggedIn ? (
                        <div className={styles.userSection}>
                            <Link href="/dashboard" className={styles.dashboardBtn}>
                                Dashboard
                            </Link>
                            
                            <div className={styles.profileContainer}>
                                <button 
                                    className={styles.profilePic}
                                    onClick={toggleDropdown}
                                    aria-label="User menu"
                                >
                                    {userInitial}
                                </button>
                                
                                {showDropdown && (
                                    <div className={styles.dropdown}>
                                        <div className={styles.dropdownContent}>
                                            <Link 
                                                href="/dashboard" 
                                                className={styles.dropdownItem}
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <span className={styles.dropdownIcon}>📊</span>
                                                Dashboard
                                            </Link>
                                            <Link 
                                                href="/settings" 
                                                className={styles.dropdownItem}
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <span className={styles.dropdownIcon}>⚙️</span>
                                                Settings
                                            </Link>
                                            <div className={styles.dropdownDivider}></div>
                                            <button 
                                                className={styles.dropdownItem}
                                                onClick={handleLogout}
                                            >
                                                <span className={styles.dropdownIcon}>🚪</span>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className={styles.loginBtn}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
    );
}