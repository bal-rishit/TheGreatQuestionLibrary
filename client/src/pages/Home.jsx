import React from "react"

import ImagesSliderDemo from "../components/ImagesSliderDemo"
import Category from "../components/Category"
import Faq from "../components/Faq"
import Contact from "../components/Contact"
import RecommendationList from "../components/RecommendationList"
import Slider from "../components/Slider"
// import ProductDetails from "../components/ProductDetails"
import { SliderData } from '../sliderdata';

function Home() {
  return (
    <div>
      
      <ImagesSliderDemo />
      {/* <Category /> */}
      <Slider slides={SliderData}/>
      {/* <RecommendationList /> */}
      {/* <ProductDetails /> */}
      <Faq />
      <Contact />
    </div>
  );
}

export default Home;
