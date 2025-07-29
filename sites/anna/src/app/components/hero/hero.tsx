import React from "react";
import Image from "next/image";
import "./hero.css";

export default function Hero(){
    return(
        <div className="hero">
            <Image
                src="/image1.png"
                alt="screenshots"
                width={640}
                height={360}
                className="Image"
            />
            <div className="action">
                <a className="download" href="https://drive.google.com/uc?export=download&id=1xK4qbgudcYv891b3XePqPVpP24AMRio4" download>Download</a>
                <a className="github">Github</a>
            </div>
            <div className="slogan">
                <h2>Made For Developers</h2>
                <h3>By Developer</h3>
            </div>
        </div>
    )
}