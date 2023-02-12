//Components

import Explore from "../components/explore";
import Footer from "../components/footer";
import Header from "../components/header/index"
import Listing from "../components/listing";
import PopularProducts from "../components/popular-products";

//Constants

import { ExploreDefault, HeaderButtonsDefault, HeaderOptionsDefault } from "../public/constants";

//Styles

import styles from '../styles/routes/Home.module.scss';

export default function Home({pricesConvertion, popular, allProducts}) {
 
  return (
    
    <div className={styles.home}>
 
      <Header menuOptions={HeaderOptionsDefault} menuButtons={HeaderButtonsDefault} />

      <main>
        <Explore {...ExploreDefault} />
        { popular.length && <PopularProducts pricesConvertion={pricesConvertion} popular={popular}/> }
        { allProducts.length && <Listing products={allProducts}/> }
      </main>

      <Footer />

    </div>
  )
}

export async function getServerSideProps() {

  const resApiKey = await fetch(`http://challenges.us-east-1.elasticbeanstalk.com/login`, { method: "POST", headers: {name: "Facundo", email: "facundosantillan21@gmail.com"}});
  const dataApiKey = await resApiKey.json();
  const apiKey = dataApiKey.key;

  const [pricesConvertion, popular, allProducts] = await Promise.all([
    fetch(`http://challenges.us-east-1.elasticbeanstalk.com/nfpaisanos/eth-price`, { method: "GET", headers: {apiKey: apiKey}}).then(r => r.json()),
    fetch(`http://challenges.us-east-1.elasticbeanstalk.com/nfpaisanos/popular`, { method: "GET", headers: {apiKey: apiKey}}).then(r => r.json()),
    fetch(`http://challenges.us-east-1.elasticbeanstalk.com/nfpaisanos/aunctions`, { method: "GET", headers: {apiKey: apiKey}}).then(r => r.json())
  ]);

  return {
    props: {
      pricesConvertion: pricesConvertion,
      popular: popular,
      allProducts: allProducts
    }
  }
}
