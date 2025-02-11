import React from "react";
import { Button } from "../index";

const HeroSection = () => {
  return (
    <section className="bg-background_secondary flex justify-center py-8 md:py-12">
      <div className="w-full max-w-[1240px] flex flex-col md:flex-row px-4 md:px-8">

        {/* Left Section - Text Content */}
        <div className="basis-full md:basis-1/2 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-black font-newsReader font-medium">
            Find Your <span className="text-text_primary">Fashion</span> Here
          </h1>
          <p className="text-text_secondary text-lg md:text-xl pt-4 md:pt-6">
            Fashion is not something that exists in dreams only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening.
          </p>
          <div className="pt-6 flex flex-col md:flex-row items-center gap-4">
            <Button
              type="button"
              bgColor="bg-text_primary"
              textColor="text-white"
              className="text-lg md:text-xl font-bold rounded-md font-standard px-6 py-2"
              children="Buy Now"
            />
            <a href="#" className="text-text_secondary underline">Add to Cart</a>
          </div>

          {/* Stats Section */}
          <div className="flex justify-between pt-8 md:pt-12 pb-4 gap-4">
            <div>
              <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold font-newsReader">9k+</h4>
              <p className="text-sm md:text-base">Unique Style</p>
            </div>
            <div>
              <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold font-newsReader">98k+</h4>
              <p className="text-sm md:text-base">User</p>
            </div>
            <div>
              <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold font-newsReader">2K+</h4>
              <p className="text-sm md:text-base">Store Retailer</p>
            </div>
          </div>
        </div>

        {/* Right Section - Image Content */}
        <div className="basis-full md:basis-1/2 flex justify-center mt-8 md:mt-0">
          <div className="relative">
            {/* Background Box */}
            <div className="bg-background_secondary h-[300px] md:h-[400px] lg:h-[460px] w-[250px] md:w-[350px] lg:w-96 z-0 mt-6 border-2 border-text_secondary"></div>

            {/* Rotated Text */}
            <h3 className="rotate-90 absolute top-24 md:top-32 -left-12 text-4xl md:text-6xl lg:text-8xl bg-background_secondary font-cookie text-text_secondary">easy</h3>
            <h3 className="rotate-90 absolute bottom-24 md:bottom-32 -right-20 text-4xl md:text-6xl lg:text-8xl bg-background_secondary font-cookie text-text_secondary">going</h3>

            {/* Image */}
            <img
              src="https://res.cloudinary.com/dpxkotl1n/image/upload/v1738022780/TrendAura/wmyudf1nurflbgpfdpr7.png"
              alt="Fashion Model"
              className="h-[400px] md:h-[500px] lg:h-[580px] z-10 absolute top-0 left-1/2 transform -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;