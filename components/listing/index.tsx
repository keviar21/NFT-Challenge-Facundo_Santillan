import Image from 'next/image';
import { useEffect, useState } from "react";

//Components

import Dropdown from "../dropdown";
import SideFilters from "../side-filters";
import TopFilters from "../top-filters";
import CardsContainer from "../cards-container";

//Constants

import { defaultFilters, defaultFiltersDropdown, defaultFiltersRange, defaultOrderBy, defaultTopFilters } from "../../public/constants";

//styles

import styles from "./Listing.module.scss"

//images

import search from "../../public/icons/search.svg"
import search_mobile from "../../public/icons/search_mobile.svg"
import more from "../../public/icons/more.svg"

interface ListingProps {
  products: any[]
}

export default function Listing({ products } : ListingProps ) {

  const [showMore, setShowMore] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const [orderBy, setOrderBy] = useState(defaultOrderBy[0].value);
  const [sortedProducts, setSortedProducts] = useState([]);

  const [actualFilters, setActualFilters] = useState(defaultFilters);

  useEffect(() => {
    
    function sortArray() {
      
      const sorted = [...products].sort(function(a, b) { 
        const DateA = new Date(a.createdAt);
        const DateB = new Date(b.createdAt);
        
        if(orderBy == "newest") {
          return DateB.getTime() - DateA.getTime();
        } else if (orderBy == "oldest") {
          return DateA.getTime() - DateB.getTime();
        }
        
      });

      const filtered = sorted.filter(item => {

        let productOk = true;

        if(actualFilters.instantPrice && item.instantPrice) {
          const itemPrice = item.instantPrice.split(" ");
          if(Number(itemPrice[0]) > Number(actualFilters.instantPrice)) productOk = false;
        }

        if(actualFilters.color && actualFilters.color != "all-colors" && item.attributes.color) {
          if(actualFilters.color != item.attributes.color) productOk = false;
        }
        
        if(actualFilters.type && actualFilters.type != "All items" && item.type) {
          if(actualFilters.type != item.type) productOk = false;
        }

        return productOk;
      });
      
      setSortedProducts(filtered);
    };
    setResetFilters(false);
    sortArray();

  }, [orderBy, actualFilters]);

  useEffect(() => {
    setOrderBy(defaultOrderBy[0].value);
  }, [resetFilters]);

  return (
    <div id="listing" className={styles.listing}>
        <div className={styles.listing__search}>
          <div className={styles.listing__search__title}>
            <h3>Type to find something nice... </h3>
            <Image src={search} alt="Search logo" width={40} height={40}/>
          </div>
          <label htmlFor="search"></label>
          <input type="text" id="search" name="search"/>
        </div>
        <div className={styles.listing__search__mobile}>
          <input type="text" placeholder="Type your keywords" />
          <Image src={search_mobile} alt="Search logo" width={20} height={20}/>
        </div>
        <div className={styles.listing__top}>
            <Dropdown isOrderBy={true} options={defaultOrderBy} setOrderBy={setOrderBy} resetFilters={resetFilters}/>
            <TopFilters options={defaultTopFilters} setActualFilters={setActualFilters} actualFilters={actualFilters} resetFilters={resetFilters}/>
        </div>
        <div className={styles.listing__main}>
          <div className={styles.listing__main__filters}>
            <SideFilters 
              filtersDropdown={defaultFiltersDropdown}
              filtersRange={defaultFiltersRange}
              setActualFilters={setActualFilters}
              actualFilters={actualFilters}
              setResetFilters={setResetFilters}
              resetFilters={resetFilters}
               />
          </div>
          { sortedProducts.length ? 
              <div className={styles.listing__main__cards_container}>
                <CardsContainer products={sortedProducts} showMore={showMore} />
                { sortedProducts.length > 9 && 
                    <div className={styles.listing__main__cards_container__more}>
                      <button className="primary-button" onClick={() => showMore ? setShowMore(false) : setShowMore(true)}>
                        <Image src={more} alt="Load more" width={16} height={16} />
                        { showMore ? "Show Less" : "Load More" }
                      </button>
                    </div>
                }
              </div>
            :
            <div className={styles.listing__main__no_results}>
              <h3>Sorry! no results<br/>Try changing the filters</h3>
            </div>
          }
        </div>
    </div>
  );
}