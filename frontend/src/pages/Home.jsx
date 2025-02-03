import React from "react";
import HeroSection from "../components/organism/HeroSection";
import {FeatureSection} from "../components/index.js";

const HomePage = () => {
  

  return (
    <div className="bg-background_primary">
      {/* Hero Section */}
      <HeroSection />

      <FeatureSection />

      <div className="flex justify-center">
        <img src="https://res.cloudinary.com/dpxkotl1n/image/upload/v1738027918/TrendAura/dmysbdkeelzndlza9cjd.jpg" alt="feature image" className="rounded-2xl w-[1240px]  h-[600px] object-cover"/>
      </div>
    </div>
  );
};

export default HomePage;
