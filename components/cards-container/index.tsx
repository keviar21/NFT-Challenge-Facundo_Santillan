import Card from "../card";
import styles from "./Cards-container.module.scss"

interface CardsContainerProps {
  products: any[]
  showMore: boolean
}

export default function CardsContainer({ products, showMore } : CardsContainerProps ) {

  return (
    <div className={styles.cards_container}>
        {
          products?.map((item, index) => {
            return(
              (index < 9 || (index >= 9 && showMore)) && <Card product={item} fewCards={products.length < 3} />
            )
          })
        }
    </div>
  );
}