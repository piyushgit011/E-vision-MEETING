import React from "react";
import image from "../assets/hero.jpg";
import extra from "../assets/balls.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="box flex flex-col md:flex-row gap-3 md:gap-5 relative justify-between items-center text-white my-14 sm:my-16 md:my-24 ">
      <img
        src={extra}
        alt="design assets"
        className="absolute top-0 w-16 sm:w-24 md:w-28 lg:w-40 left-[50%]"
      />
      <motion.div
        className="md:flex-[0.6] flex items-start flex-col justify-center mt-5 px-5 md:px-0"
        initial={{ translateX: "-100%", opacity: 0 }}
        whileInView={{ translateX: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold my-1 sm:my-3 lg:my-5 relative">
          AI-based meeting platform
        </p>
        <p className="text-[10px] sm:text-base md:text-xl text-gray-400">
          Imagine how hard it is to analyse others in a online meeting.
          We aim to provide an ai solution to monitor participants in a meet. And track the essential data to analyse the interactivity of the session.
        </p>
      </motion.div>
      <motion.div
        className="md:flex-[0.4] flex md:block items-center justify-center"
        initial={{ translateX: "100%", opacity: 0 }}
        whileInView={{ translateX: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={image}
          alt="banner"
          className="object-contain rounded-full w-3/4 md:w-full"
        />
      </motion.div>
    </div>
  );
}
