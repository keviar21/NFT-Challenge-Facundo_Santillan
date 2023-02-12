import Image from 'next/image';
import { motion } from "framer-motion"

//Constants

import { defaultAvatar, defaultPhoto, defaultTitle } from "../../public/constants";

//styles

import styles from "./Product.module.scss"

//images

import eth_logo from "../../public/icons/eth_logo.svg"
import right_arrow from "../../public/icons/right_arrow.svg"

interface ProductProps {
  product: any,
  pricesConvertion: any,
  showPagination: boolean,
  totalProducts: number,
  currentProduct: number,
  setCurrentProduct: Function
}

function convertETHtoUSD(highestBid: string, usdEq: string) : string {

  const bidSplit = highestBid.split(' ');
  const bid = bidSplit[0];
  const usdEqFloat = usdEq.replace(',', '');

  const result = parseFloat(bid) * parseFloat(usdEqFloat);

  return result.toString();
}

function calculateTimeLeft(endsAt: any) {
  
  const now = new Date().getTime();
  const futureDate = new Date(endsAt).getTime();
  const timeleft = futureDate - now;

  const days = Math.floor( timeleft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

  return { days: Math.abs(days), hours: Math.abs(hours), minutes: Math.abs(minutes) }
}

function nextProduct(setCurrentProduct: Function, currentProduct: number) {
  setCurrentProduct(currentProduct+1);
}

function prevProduct(setCurrentProduct: Function, currentProduct: number) {
  setCurrentProduct(currentProduct-1);
}

export default function Product({ product, pricesConvertion, showPagination, totalProducts, currentProduct, setCurrentProduct } : ProductProps ) {

  const { title, media, authorAvatar, author, instantPrice , highestBid, endsAt } = product || {};

  const photo = media.image ? media.image : defaultPhoto;
  const productTitle = title ? title : defaultTitle;
  const avatar = authorAvatar ? authorAvatar : defaultAvatar;

  const convertion = convertETHtoUSD(highestBid, pricesConvertion.usd);
  const timeLeft = calculateTimeLeft(endsAt);

  return (
    <div className={styles.product}>

        <div className={styles.product__image}>
          <Image 
           loader={() => photo} src={photo}
           alt="Product Image"
           width={640}
           height={800}
           loading="lazy"
           placeholder="blur"
           blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkcHSsBwABzgED45kBZAAAAABJRU5ErkJggg=="/>
        </div>

        <div className={styles.product__content}>
          
          <h2 className={styles.product__content__title}>{productTitle}</h2>
          <div className={styles.product__content__quick_info}>
            <div className={styles.product__content__quick_info__content}>
              <Image loader={() => avatar} src={avatar} alt="Author Photo" width={40} height={40} loading="lazy"/>
              <div className={styles.product__content__quick_info__content__text}>
                <h5>Creator</h5>
                <p>{author}</p>
              </div>
            </div>
            <div className={styles.product__content__quick_info__content}>
              <Image src={eth_logo} alt="ETH logo" width={40} height={40}/>
              <div className={styles.product__content__quick_info__content__text}>
                <h5>Instant price</h5>
                <p>{instantPrice}</p>
              </div>
            </div>
          </div>

          <div className={styles.product__content__info}>
            <div className={styles.product__content__info__price}>
              <h5 className={styles.product__content__info__price__eyebrow}>Current Bid</h5>
              <h3 className={styles.product__content__info__price__title}>{highestBid}</h3>
              <p className={styles.product__content__info__price__convertion}>$ {convertion}</p>
              <div className={styles.product__content__info__price__expires}>
                <h5 className={styles.product__content__info__price__expires__title}>Auction ending in</h5>
                <div className={styles.product__content__info__price__expires__container}>
                  <div className={styles.product__content__info__price__expires__container__time}>
                    <p className={styles.product__content__info__price__expires__container__time__number}>{timeLeft.days.toString()}</p>
                    <p className={styles.product__content__info__price__expires__container__time__lapse}>Days</p>
                  </div>
                  <div className={styles.product__content__info__price__expires__container__time}>
                    <p className={styles.product__content__info__price__expires__container__time__number}>{timeLeft.hours.toString()}</p>
                    <p className={styles.product__content__info__price__expires__container__time__lapse}>hs</p>
                  </div>
                  <div className={styles.product__content__info__price__expires__container__time}>
                    <p className={styles.product__content__info__price__expires__container__time__number}>{timeLeft.minutes.toString()}</p>
                    <p className={styles.product__content__info__price__expires__container__time__lapse}>mins</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <div className={styles.product__content__buttons}>
            <motion.button className={`${styles.product__content__buttons__see_more} secondary-button`} whileHover={{ scale: 1.05 }}>View item</motion.button>
            <button className={`${styles.product__content__buttons__buy} primary-button`}>Place a bid</button>
          </div>

          { showPagination && 
            <div className={styles.product__content__pagination}>
              <button className={`${styles.product__content__pagination__left_arrow} ${ currentProduct == 0 && styles.product__content__pagination__left_arrow___disabled }`}
              onClick={() => prevProduct(setCurrentProduct, currentProduct)}
              disabled={currentProduct == 0}>
                <Image src={right_arrow} alt="Popular previus product" width={20} height={20} />
              </button>
              <button className={`${styles.product__content__pagination__right_arrow} ${ currentProduct == totalProducts-1 && styles.product__content__pagination__right_arrow___disabled }`}
              onClick={() => nextProduct(setCurrentProduct, currentProduct)}
              disabled={currentProduct == totalProducts-1}>
                <Image src={right_arrow} alt="Popular next product" width={20} height={20} />
              </button>
            </div>
          }

        </div>

    </div>
  );
}