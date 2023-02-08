import React from "react";

import Container from "../Container";
import logo from "../../assets/images/logo.png";
import { ButtonBasic } from "../atoms/button/Button";
import { SubTitle } from "../atoms/title/Title";
import ImageSection from "../atoms/image/Image";
import Section from "../templates/Section";

function Hero() {
   return (
      <Section>
         <div className="text-center md:text-left xl:py-12 lg:pt-7 md:pt-4 mt-10 md:mt-0 mb-12 md:mb-0">
            <h1 className="lg:text-[50px] md:text-4xl capitalize text-3xl font-bold text-amber-900 md:pr-10 tracking-wider leading-relaxed lg:leading-relaxed">
               relaxing your mind with horizon coffee.
            </h1>
            <SubTitle
               title="Boost your produtifity and build your mood with a-glass of
            coffee."
            />
            <div className="relative flex md:mt-9 mt-16 w-full px-2 md:w-8/12 md:px-0 justify-evenly md:justify-between">
               <ButtonBasic
                  href="/products"
                  title="Get Coffee"
                  styledCustom="bg-amber-100 shadow-lg md:w-36 py-3"
               />
               <ButtonBasic title="Reservation" />
            </div>
         </div>
         <ImageSection src={logo} />
      </Section>
   );
}

export default Hero;
