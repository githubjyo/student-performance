import React from "react";
import { motion } from "framer-motion";


const CardItem = ({ title, value, icon, color }) => {
return (
<motion.div className="col-md-4" whileHover={{ scale: 1.05 }}>
<div className={`card shadow border-0 text-center text-${color}`}>
<div className="card-body">
<i className={`bi ${icon} fs-1 mb-3`}></i>
<h5 className="fw-bold">{title}</h5>
<h3>{value}</h3>
</div>
</div>
</motion.div>
);
};


export default CardItem;