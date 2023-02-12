import { motion } from "framer-motion"

//Styles
import styles from "./Explore.module.scss"

interface ExploreProps {
    eyebrow?: string;
    title: string;
    ctaText: string;
}

function jumpTo(target: string) {

  const element = document.getElementById(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Explore({ eyebrow, title, ctaText } : ExploreProps) {
  return (
    <div className={styles.explore}>
        <div className={styles.explore__content}>
            <h4 className={styles.explore__content__eyebrow}>{eyebrow}</h4>
            <h2 className={styles.explore__content__title}>{title}</h2>
            <motion.button className="primary-button" onClick={() => jumpTo("listing")} whileHover={{ scale: 1.2 }}>{ctaText}</motion.button>
        </div>
    </div>
  );
}