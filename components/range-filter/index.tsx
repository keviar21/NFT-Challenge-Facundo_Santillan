//Utils
import { useEffect, useState } from "react";
import { ListingFilters } from "../../public/interfaces/filters";

//Styles
import styles from "./Range-filter.module.scss"

interface RangeFilterProps {
    title: string,
    value: string,
    minVal: number,
    maxVal: number,
    currency: string,
    setActualFilters: Function,
    actualFilters: ListingFilters,
    resetFilters: boolean
}

export default function RangeFilter({ title, value, minVal, maxVal, currency, setActualFilters, actualFilters, resetFilters } : RangeFilterProps) {

  const [val, setVal] = useState(maxVal);

  const changeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(parseFloat(event.target.value));
  };

  useEffect(() => {

    function handleSetFilter(val: string) {
      let filtersCopy = {...actualFilters};
      if(value == "instantPrice") {
        filtersCopy.instantPrice = val;
      }
      return filtersCopy;
    }
    const timeOut = setTimeout(() => setActualFilters(handleSetFilter(val.toString())), 1000);
    return () => clearTimeout(timeOut);
  }, [val]);

  useEffect(() => {
    setVal(maxVal);
  }, [resetFilters]);

  return (
    <div className={styles.range_filter}>
        <label className={styles.range_filter__title} htmlFor={`range-${value}`}>{title}</label>
        <input
          type='range'
          id={`range-${value}`}
          className={styles.range_filter__input}
          onChange={changeVal}
          min={minVal}
          max={maxVal}
          step={0.001}
          value={val}
        ></input>
        <div className={styles.range_filter__limits}>
          <p>{minVal} {currency}</p>
          <p className={styles.range_filter__limits__actual}>{val} {currency}</p>
          <p>{maxVal} {currency}</p>
        </div>
    </div>
  );
}