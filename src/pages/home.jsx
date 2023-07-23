import React from "react";
import Hero from "../components/home/Hero";
import Layout from "../components/Layout";
import Features, { Facilities } from "../components/home/Features";
import Gallery from "../components/home/Gallery";
import Reviews from "../components/home/Reviews";

function home() {
   return (
      <Layout>
         <Hero />
         <Features />
         <Facilities />
         <Gallery />
         <Reviews />
      </Layout>
   );
}

export default home;
