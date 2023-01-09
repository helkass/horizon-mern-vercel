import React from 'react';
import Hero from '../components/home/Hero';
import Layout from '../components/Layout';
import Features from "../components/home/Features"
import Gallery from '../components/home/Gallery';
import Reviews from '../components/home/Reviews';

function home() {
  return (
    <Layout>
      <Hero/>
      <Features/>
      <Gallery/>
      <Reviews/>
    </Layout>
  )
}

export default home