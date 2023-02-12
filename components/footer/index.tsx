import Image from 'next/image';

//Components

import MainLogo from "../main-logo";

//Styles

import styles from "./Footer.module.scss"

//Images

import heart from "../../public/icons/heart.png"

export default function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footer__content}>
            <MainLogo />
            <h3 className={styles.footer__content__title}>The New Creative Economy.</h3>
        </div>
        <div className={styles.footer__signature}>
          <p className={styles.footer__signature}>Created with <Image src={heart} alt="Footer heart" width={10} height={10}/> By Facundo Santillan (Future Paisano)</p>
        </div>
    </div>
  );
}