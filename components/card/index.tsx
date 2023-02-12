import Image from 'next/image';

//Constants
import { defaultCardTitle, defaultPhoto } from "../../public/constants";

//Styles

import styles from "./Card.module.scss"

//Images

import favorite from "../../public/icons/favorite.svg"
import no_author from "../../public/images/no_author.png"
import highest_bid from "../../public/icons/highest_bid.svg"
import fire from "../../public/icons/fire.png"

interface CardProps {
    product: any,
    fewCards: boolean
}

export default function Card({ product, fewCards } : CardProps ) {

  const { media, title, instantPrice, bidUsers, stock, highestBid, attributes } = product || {};

  const photo = media.image ? media.image : defaultPhoto;
  const productTitle = title ? title : defaultCardTitle;

  return (
    <div className={`${styles.card} ${fewCards && styles.card___few}`}>
      <div className={styles.card__image}>
        { (attributes.type == "rare" || attributes.type == "legendary") && <div className={`${styles.card__image__label} ${attributes.type}`}>{attributes.type}</div> }
        <Image className={styles.card__image__favorite} src={favorite} alt="Add favorite" width={32} height={32}/>
        <Image 
        className={styles.card__image__product_image}
        loader={() => photo} src={photo}
        alt="Card NFT image"
        height={300}
        width={232}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkcHSsBwABzgED45kBZAAAAABJRU5ErkJggg==" 
        />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__content__info}>
          <h3 className={styles.card__content__info__title}>{productTitle}</h3>
          <p className={styles.card__content__info__price}>{instantPrice}</p>
        </div>
        <div className={styles.card__content__owners}>
          <div className={styles.card__content__owners__photos}>
            {
              bidUsers?.map((item, index) => {
                return(
                  <Image loader={() => item.avatar || no_author} src={item.avatar || no_author} alt="Bid users" width={24} height={24} loading="lazy" style={{left: index * 20}}/>
                )
              })
            }
          </div>
          <p className={styles.card__content__owners__stock}>{stock} in stock</p>
        </div>
        <div className={styles.card__content__bid}>
          <div className={styles.card__content__bid__highest_bid}>
            <Image src={highest_bid} alt="Highest Bid" width={20} height={20}/>
            <p>Highest bid</p>
            { highestBid && <p className={styles.card__content__bid__highest_bid__bid}>{highestBid}</p> }
          </div>
          <div className={styles.card__content__bid__new_bid}>
            <p>New bid</p>
            <Image src={fire} alt="New Bid" width={15} height={15}/>
          </div>
        </div>
      </div>
    </div>
  );
}