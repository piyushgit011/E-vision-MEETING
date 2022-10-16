import React, { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import meet from "../assets/meet.jpg";
import report from "../assets/report.jpg";
import learn from "../assets/learnmore.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { Store } from "../store";

export default function Services() {
  // const {state} = useContext(Store);
  // const {userInfo} = state;

  return (
    <div className="box flex flex-col justify-center items-center px-[5vw] sm:px-[10vw] text-white mt-16">
      {/* one */}
      <div className="flex flex-col md:flex-row justify-around mt-20 items-center gap-5">
        <motion.div
          className="flex flex-col md:flex-[0.7] items-start"
          initial={{ translateX: "-100%", opacity: 0 }}
          whileInView={{ translateX: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, staggerChildren: 0.5 }}
        >
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl font-semibold my-3"
            initial={{ translateX: "-100%", opacity: 0 }}
            whileInView={{ translateX: "0%", opacity: 1 }}
            viewport={{ once: true }}
          >
            Create A Meet
          </motion.h1>
          <motion.p
            className="text-[12px] xs:text-sm sm:text-lg md:text-xl"
            initial={{ translateX: "-100%", opacity: 0 }}
            whileInView={{ translateX: "0%", opacity: 1 }}
            viewport={{ once: true }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            maxime id consectetur exercitationem, perspiciatis quas numquam
            tenetur reprehenderit illo provident.
          </motion.p>
          <Link to="/class">
            <motion.div
              className="btn mt-3 flex gap-2 hover:gap-10 duration-500 text-black font-semibold bgGradient"
              initial={{ translateX: "-100%", opacity: 0 }}
              whileInView={{ translateX: "0%", opacity: 1 }}
              viewport={{ once: true }}
            >
              Join Now
              <BsArrowRight />
            </motion.div>
          </Link>
        </motion.div>
        <div className="md:flex-[0.3] flex items-center justify-center">
          <img
            src={meet}
            alt="look around"
            className="object-contain w-3/4 md:w-full rounded-full"
          />
        </div>
      </div>
      {/* two */}
      <div className="flex flex-col md:flex-row justify-around mt-10 items-center gap-5">
        <div className="md:flex-[0.3] flex items-center justify-center">
          <img
            src={report}
            alt="look around"
            className="object-contain w-3/4 md:w-full rounded-full"
          />
        </div>
        <motion.div
          className="flex flex-col md:flex-[0.7] items-start"
          initial={{ translateX: "100%", opacity: 0 }}
          whileInView={{ translateX: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, staggerChildren: 0.5 }}
        >
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl font-semibold my-3"
            initial={{ translateX: "100%", opacity: 0 }}
            whileInView={{ translateX: "0%", opacity: 1 }}
            viewport={{ once: true }}
          >
            Assessment Report
          </motion.h1>
          <motion.p
            className="text-[12px] xs:text-sm sm:text-lg md:text-xl"
            initial={{ translateX: "100%", opacity: 0 }}
            whileInView={{ translateX: "0%", opacity: 1 }}
            viewport={{ once: true }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ullam animi qui. Saepe aliquid officia at! Aliquid atque accusantium
            consequuntur?
          </motion.p>
          <Link to="/class">
            <motion.div
              className="btn mt-3 flex gap-2 hover:gap-10 duration-500 text-black font-semibold bgGradient"
              initial={{ translateX: "100%", opacity: 0 }}
              whileInView={{ translateX: "0%", opacity: 1 }}
              viewport={{ once: true }}
            >
              See Now <BsArrowRight />
            </motion.div>
          </Link>
        </motion.div>
      </div>
      {/* three */}
      <div className="flex flex-col md:flex-row justify-around mt-10 items-center gap-5">
        <motion.div
          className="flex flex-col md:flex-[0.7] items-start"
          initial={{ translateX: "-100%", opacity: 0 }}
          whileInView={{ translateX: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, staggerChildren: 0.5 }}
        >
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl font-semibold my-3"
            initial={{ translateX: "-100%", opacity: 0 }}
            whileInView={{ translateX: "0%", opacity: 1 }}
            viewport={{ once: true }}
          >
            Ways To Improve
          </motion.h1>
          <motion.p
            className="text-[12px] xs:text-sm sm:text-lg md:text-xl"
            initial={{ translateX: "-100%", opacity: 0 }}
            whileInView={{ translateX: "0%", opacity: 1 }}
            viewport={{ once: true }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero itaque
            excepturi totam voluptas ea minus atque quis exercitationem
            reiciendis qui.
          </motion.p>
          <motion.div
            className="btn mt-3 flex gap-2 hover:gap-10 duration-500 text-black font-semibold bgGradient"
            initial={{ translateX: "-100%", opacity: 0 }}
            whileInView={{ translateX: "0%", opacity: 1 }}
            viewport={{ once: true }}
          >
            Learn More <BsArrowRight />
          </motion.div>
        </motion.div>
        <div className="md:flex-[0.3] flex items-center justify-center">
          <img
            src={learn}
            alt="look around"
            className="object-contain w-3/4 md:w-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
