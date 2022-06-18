import React, { useEffect, useState } from 'react'
import './Carousel.css'

export default function Carousel({ images }) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [timer, setTimer] = useState(null);

    /**
     * resets timer each time a 
     * new slide is rendered
     */
    function resetTimer() {
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            nextSlide();
        }, 5000));
    };

    /**
     * 
     * @param {number} n 
     * sets the current image
     * of the carousel too the
     * image at specified index #
     */
    function selectIndex(n) {
        setCurrentImageIndex(n);
    };

    /**
     * sets the next slide to be 
     * the current index + 1
     * modulo the length of the array
     */
    function nextSlide() {
        selectIndex((currentImageIndex + 1) % images.length);
    };

    /**
     * resets the carousel timer
     * everytime the page renders or
     * the current carousel array index changes
     */
    useEffect(() => {
        resetTimer();
    }, [currentImageIndex]);

    return (


        <div className="carousel-root">

            <img src={images[currentImageIndex]} alt="Slide Image" />

        </div>


    )
};
