import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Home, Key } from "lucide-react";

interface SplashProps {
  onFinished: () => void;
  duration?: number;
  logoUrl?: string;
}

const Splash = ({ onFinished, duration = 3000, logoUrl }: SplashProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinished, 500); // Allow exit animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinished]);

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="logo-container"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {logoUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="custom-logo-container"
          >
            <img src={logoUrl} alt="StaySync Logo" className="custom-logo" />
          </motion.div>
        ) : (
          <div className="logo-icons-container">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="logo-icon building-icon"
            >
              <Building2 size={48} className="text-primary" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="logo-icon home-icon"
            >
              <Home size={64} className="text-primary" />
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="logo-icon key-icon"
            >
              <Key size={48} className="text-primary" />
            </motion.div>
          </div>
        )}
      </motion.div>

      <motion.div
        className="company-name"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <img
          src="https://raw.githubusercontent.com/lord-Cyborg/StaySync-Tempo/main/StaySync_Brand.png"
          alt="StaySync Brand"
          className="brand-logo"
        />
      </motion.div>

      <motion.div
        className="loading-indicator"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default Splash;
