import React, {useState, useEffect} from "react";
import HeroSection from "../components/organism/HeroSection";
import {FeatureSection, FeatureImage} from "../components/index.js";



const HomePage = () => {
 

  return (
    <div className="bg-background_primary">
      {/* Hero Section */}
      <HeroSection />

      <FeatureSection />
      <FeatureImage/>
  
    </div>
  );
};

export default HomePage;
