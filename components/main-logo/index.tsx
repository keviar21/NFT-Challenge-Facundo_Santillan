import Link from "next/link";
import Image from 'next/image';

//Styles

import styles from "./Main-logo.module.scss"

//Images

import main_icon from "../../public/icons/main_icon.svg"

export default function MainLogo() {
  return (
    <div className={styles.main_logo}>
        <Link href={"/"}>
            <Image src={main_icon} alt="Main Logo" width={32} height={32}/>
            <h2>NFPaisanos</h2>
        </Link>
    </div>
  );
}