import React, { useEffect, useState } from 'react'
import './Carousel.css'

export default function Carousel({ images }) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [timer, setTimer] = useState(null);

    function resetTimer() {
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            nextSlide();
        }, 5000));
    };

    function selectIndex(n) {
        setCurrentImageIndex(n);
    };

    function nextSlide() {
        selectIndex((currentImageIndex + 1) % images.length);
    };

    function prevSlide() {
        selectIndex((currentImageIndex + images.length - 1) % images.length);
    };

    useEffect(() => {
        resetTimer();
    }, [currentImageIndex]);

    return (


        <div className="carousel-root">

            <img src={images[currentImageIndex]} alt="Slide Image" />

        </div>


    )
};
