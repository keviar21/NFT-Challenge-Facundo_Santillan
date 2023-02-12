import { useEffect, useState } from "react";

//Interfaces

import { FilterOption, ListingFilters } from "../../public/interfaces/filters";

//Styles

import styles from "./TopFilters.module.scss"

interface TopFiltersProps {
  options: FilterOption[],
  setActualFilters: Function,
  actualFilters: ListingFilters,
  resetFilters: boolean
}

export default function TopFilters( { options, setActualFilters, actualFilters, resetFilters } : TopFiltersProps ) {

  const defaultOption = options && options[0].label;

  const [selected, setSelected] = useState(defaultOption);

  useEffect(() => {
    setSelected(defaultOption);
  }, [resetFilters]);

  function handleSetFilter(val: string) {
    let filtersCopy = {...actualFilters};
    filtersCopy.type = val;
    return filtersCopy;
  }

  const handleClickOptionDropdown = (value: string, label: string) => {
    if(selected == label) {
      return;
    }
    setActualFilters(handleSetFilter(label));
    setSelected(label);
    console.log(`tap-${value}-top-filter`); //this is a recreation of an evento sended to Google analytics
  }

  return (
    <div className={styles.top_filters}>
        <ul className={styles.top_filters__list}>
          {
            options?.map((item) => {
              return(
                <li className={`${styles.top_filters__list__option} ${item.label == selected && styles.top_filters__list__option___selected}`}
                onClick={() => handleClickOptionDropdown(item.value, item.label)} key={`top-filter-${item.value}`}>{item.label}</li>
              )
            })
          }
        </ul>
    </div>
  );
}