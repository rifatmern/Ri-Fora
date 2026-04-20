"use client"
import { useEffect, useState } from 'react'
import { BiUpArrowAlt } from "react-icons/bi";

const ToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            {isVisible && (
                <div>
                    <button
                        className="text-white bg-[#fb2e38] flex justify-center items-center text-[27px] z-50 fixed bottom-5 right-5 rounded-full h-12 w-12 shadow-lg hover:bg-[#e52a32] transition-colors duration-300"
                        onClick={handleToTop}
                    >
                        <BiUpArrowAlt className="block" />
                    </button>
                </div>
            )}
        </>
    );
}

export default ToTop;