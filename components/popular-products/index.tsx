import { useState } from "react";
import Product from "../product";
import styles from "./Popular-products.module.scss"

interface PopularProductsProps {
  pricesConvertion: any,
  popular: any[]
}

export default function PopularProducts( { pricesConvertion, popular } : PopularProductsProps ) {

  const [currentProduct, setCurrentProduct] = useState(0);

  return (
    <div className={styles.popular_products}>
        <Product 
          product={popular[currentProduct]}
          pricesConvertion={pricesConvertion}
          showPagination={true}
          totalProducts={popular.length}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}/>
    </div>
  );
}