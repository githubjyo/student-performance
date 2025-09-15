import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/dashboard-hero.jpg";


const AnimatedImage = () => {
return (
<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
<img src={heroImg} alt="Dashboard Banner" className="img-fluid rounded-4 shadow" />
</motion.div>
);
};


export default AnimatedImage;