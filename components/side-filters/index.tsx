import Image from 'next/image';

//Components

import Dropdown from "../dropdown";
import RangeFilter from "../range-filter";

//Interfaces

import { FilterDropdown, FilterRange, ListingFilters } from "../../public/interfaces/filters";

//Constants

import { defaultFilters } from "../../public/constants";

//Styles

import styles from "./SideFilters.module.scss"

//Images

import clear_filters from "../../public/icons/clear_filters.svg"

interface SideFiltersProps {
  filtersDropdown: FilterDropdown[],
  filtersRange: FilterRange[],
  setActualFilters: Function,
  actualFilters: ListingFilters,
  setResetFilters: Function,
  resetFilters: boolean
}

export default function SideFilters( { filtersDropdown, filtersRange, setActualFilters, actualFilters, setResetFilters, resetFilters } : SideFiltersProps ) {

  function resetFiltersButton() {
    setActualFilters(defaultFilters);
    setResetFilters(true);
  }

  return (
    <div className={styles.side_filters}>
      <ul className={styles.side_filters__list}>
        {
          filtersRange?.map((item) => {
            return(
              item.enabled && 
              <li className={styles.side_filters__list__filter} key={`range-${item.value}-menu`}>
                { <RangeFilter {...item} setActualFilters={setActualFilters} actualFilters={actualFilters} resetFilters={resetFilters}/>}
              </li>
            )
          })
        }
      </ul>
      <ul className={styles.side_filters__list}>
        {
          filtersDropdown?.map((item) => {
            return(
              item.enabled && 
              <li className={styles.side_filters__list__filter} key={`dropdown-${item.value}-menu`}>
                {<Dropdown isOrderBy={false} {...item} setActualFilters={setActualFilters} actualFilters={actualFilters} resetFilters={resetFilters}/>}
              </li>
            )
          })
        }
      </ul>
      <div className={styles.side_filters__reset} onClick={() => resetFiltersButton()}>
        <Image src={clear_filters} alt="Clear filters" width={20} height={20} />
        <p>Reset filter</p>
      </div>
    </div>
  );
}