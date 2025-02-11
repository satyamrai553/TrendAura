import React from "react";
import HeroSection from "../components/organism/HeroSection";
import { FeatureSection, FeatureImage } from "../components/index.js";

const HomePage = () => {
  return (
    <div className="bg-background_primary">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Sections */}
      <FeatureSection />
      <FeatureImage />
    </div>
  );
};

export default HomePage;