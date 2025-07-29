import React from "react";
import "./footer.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer(){
    return(
        <div className="footer">
            <div className="text">
                <h5>Copyright- 2024 DevBlog by Debashis. All rights reserved.</h5>
                <p>Crafted with 💻 & ☕, fueled by passion for tech.</p>
            </div>
            <div className="icons">
            <Link href={"https://github.com/Debashismitra01"}>
            <Image 
        src="/github.png"
        alt="github"
        width={30}
        height={30}
        className="Image"
        /></Link>
                <Link href={"https://www.linkedin.com/in/debashismitra01/"}>
            <Image 
        src="/linkedin.png"
        alt="linkedin"
        width={30}
        height={30}
        className="Image"
        /></Link>
            </div>
        </div>
    )
}