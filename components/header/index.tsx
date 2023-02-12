import Image from 'next/image';
import Link from 'next/link'
import { useState } from "react";
import { motion } from "framer-motion"

//Componentns

import MainLogo from "../main-logo";

//Styles

import styles from "./Header.module.scss"

//Images

import x from "../../public/icons/x.png"
import hamburger from "../../public/icons/hamburger.svg"

interface menuOption {
    label: string,
    value: string,
    link: string,
    externalLink: boolean
}

interface menuButton {
    label: string,
    value: string,
    link?: string,
    externalLink?: boolean
    type: string
}

interface HeaderProps {
    menuOptions: menuOption[],
    menuButtons: menuButton[]
}

export default function Header( { menuOptions, menuButtons } : HeaderProps ) {

    const [openModal, setOpenModal] = useState(false);

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
      }

    const handleOpenModal = (open: boolean) => {
        open ? setOpenModal(true) : setOpenModal(false);
        open ? console.log(`tap-hamburger-header`) : console.log(`tap-close-header-modal`); // this is a recreation of an event for Google Analitics
    }
    
    const handleClickOptionHeader = (value: string, type: string, device: string) => {
        console.log(`tap-${value}-${type}-${device}-header`); // this is a recreation of an event for Google Analitics
    }

  return (
    
    <div className={styles.header}>
        <div className={styles.header__desktop}>
            <div className={styles.header__desktop__container}>
                <div className={styles.header__desktop__container__content}>
                    <MainLogo />
                    <ul className={styles.header__desktop__container__content__menu}>
                        {
                            menuOptions?.map((item) => {
                                return (
                                    <li className={styles.header__desktop__container__content__menu__option} 
                                    onClick={() => handleClickOptionHeader(item.value, "option", "desktop")}
                                    key={`header-${item.value}-option-desktop`}>
                                        { item.externalLink ? <a href={item.link}>{item.label}</a> : <Link href={item.link}>{item.label}</Link>}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <ul className={styles.header__desktop__container__buttons}>
                    {
                        menuButtons?.map((item) => {
                            return (
                                <li className={styles.header__desktop__container__buttons__button} 
                                onClick={() => handleClickOptionHeader(item.value, "button", "desktop")}
                                key={`header-${item.value}-button-desktop`}>
                                    {
                                        item.link ? 
                                        (
                                            item.externalLink ? 
                                            <a href={item.link} className={item.type}>{item.label}</a> 
                                            : 
                                            <Link href={item.link} className={item.type} >{item.label}</Link>
                                        ) 
                                        : 
                                        <button className={item.type}>{item.label}</button>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>

        <div className={styles.header__mobile}>
            <div className={styles.header__mobile__top}>
                <MainLogo />
                { openModal ? 
                    <div className={styles.header__mobile__top__image}><Image src={x} alt="Hamburger mobile" width={20} height={20} onClick={() => handleOpenModal(false)}/></div>
                    :
                    <div className={styles.header__mobile__top__image}><Image src={hamburger} alt="Hamburger mobile" width={32} height={32} onClick={() => handleOpenModal(true)}/></div>
                }
            </div>
            <motion.div animate={openModal ? "open" : "closed"} variants={variants} className={styles.header__mobile__modal}>
                <ul className={styles.header__mobile__modal__options}>
                    {
                        menuOptions?.map((item) => {
                            return (
                                <li className={styles.header__mobile__modal__options__option} 
                                onClick={() => handleClickOptionHeader(item.value, "option", "mobile")}
                                key={`header-${item.value}-option-mobile`}>
                                    { item.externalLink ? <a href={item.link}>{item.label}</a> : <Link href={item.link}>{item.label}</Link>}
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className={styles.header__mobile__modal__buttons}>
                    {
                        menuButtons?.map((item) => {
                            return (
                                <li className={styles.header__mobile__modal__buttons__button} 
                                onClick={() => handleClickOptionHeader(item.value, "button", "mobile")}
                                key={`header-${item.value}-button-mobile`}>
                                    {
                                        item.link ? 
                                        (
                                            item.externalLink ? 
                                            <a href={item.link}>{item.label}</a> 
                                            : 
                                            <Link href={item.link}>{item.label}</Link>
                                        ) 
                                        : 
                                        <button>{item.label}</button>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </ motion.div>
        </div>

    </div>
  );
}