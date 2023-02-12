import { useEffect, useState } from "react";
import Image from 'next/image';

//Interfaces

import { FilterOption, ListingFilters } from "../../public/interfaces/filters";

//Styles

import styles from "./Dropdown.module.scss"

//Images

import down_arrow from "../../public/icons/down_arrow.svg"

interface DropdownProps {
  isOrderBy: boolean,
  options: FilterOption[],
  title?: string,
  value?: string,
  setOrderBy?: Function,
  setActualFilters?: Function,
  actualFilters?: ListingFilters,
  resetFilters: boolean
}

export default function Dropdown({ isOrderBy, options, title, value, setOrderBy, setActualFilters, actualFilters, resetFilters } : DropdownProps) {

  const defaultOption = options && options[0].label;

  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(defaultOption);


  function handleSetFilter(val: string) {
   
    let filtersCopy = {...actualFilters};
    if(value == "colors") {
      filtersCopy.color = val;
    }
    return filtersCopy;
  }

  const handleOpenDropdown = (value?: string) => {
    opened ? setOpened(false) : setOpened(true);
    if(isOrderBy) {
      opened ? console.log("close-order-by") : console.log("open-order-by"); //this a recreation of an event send to Google Analytics
    } else {
      opened ? console.log(`close-${value}-filter`) : console.log(`open-${value}-filter`);
    }
  }

  const handleClickOptionDropdown = (value: string, label: string) => {

    if(selected == label) {
      return;
    }

    isOrderBy ? setOrderBy(value) : setActualFilters(handleSetFilter(value));

    setSelected(label);
    setOpened(false);
    console.log(`tap-${value}-dropdown-filter`)
  }

  useEffect(() => {
    setSelected(defaultOption);
  }, [resetFilters]);

  return (
    <div className={`${styles.dropdown} ${isOrderBy && styles.dropdown___relative}`}>
        { title && <h5 className={styles.dropdown__title}>{title}</h5>}
        <div className={styles.dropdown__button} onClick={() => handleOpenDropdown(!isOrderBy && value)}>
          <p className={styles.dropdown__button__text}>{selected}</p>
          <div className={`${styles.dropdown__button__arrow} ${ opened && styles.dropdown__button__arrow___open}`}>
            <Image src={down_arrow} alt="Dropdown down arrow" />
          </div>
        </div>
        <div className={`${styles.dropdown__modal} ${isOrderBy && styles.dropdown__modal___absolute} ${opened && styles.dropdown__modal___visible}`}>
          <ul>
            {
              options?.map((item) => {
                return(
                  <li
                  className={`${styles.dropdown__modal__option} ${item.label == selected && styles.dropdown__modal__option___selected}`}
                  onClick={() => handleClickOptionDropdown(item.value, item.label)}
                  key={`option-${item.value}-filter`}>
                    { item.image && <div className={styles.dropdown__modal__option__image}><Image src={`./icons/${item.image}`} alt="Dropdown image option"  width={16} height={16} /></div> }
                    { item.color && <div className={`${styles.dropdown__modal__option__color} ${item.color == "all" && styles.dropdown__modal__option__color___all}`} style={{backgroundColor: item.color, borderColor: item.color}}></div> }
                    <p className={styles.dropdown__modal__option__label}>{item.label}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
    </div>
  );
}