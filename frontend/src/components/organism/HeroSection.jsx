import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-background_secondary flex justify-center">
      <div className="w-[1240px] flex justify-center flex-row">

        <div className="basis-1/2">
          <div className="text-8xl text-black font-newsReader pt-12 font-medium">Find Your <span className="text-text_primary">Fashion</span> Here</div>
          <p className="text-text_secondary text-xl pt-6">Fashion is not something that exists in dreams only fashion is in the sky
            in the street, fashion has to do with ideas, the way we live, what is
            happening.</p>
            <div className="pt-6">
            <button className="bg-text_primary text-white text-xl font-bold rounded-md font-standard p-2">Buy Now</button>
          
            <a href="#" className="ml-2"><u>add to cart</u></a>
            </div>
          
          <div className="flex justify-between pt-6 pb-4">
            <div>
              <h4 className="text-6xl font-bold font-newsReader">9k+</h4>
              <p className="text-center">Unique Style</p>
            </div>
            <div>
              <h4 className="text-6xl font-bold font-newsReader">98k+</h4>
              <p className="text-center">User</p>
            </div>
            <div>
              <h4 className="text-6xl font-bold font-newsReader">2K+</h4>
              <p className="text-center">Store Retailer</p>
            </div>
          </div>
        </div>



        <div className="basis-1/2 flex pt-6 pb-6 justify-center">
        <div className="relative">
        <div className="bg-background_secondary h-[460px] w-96 z-0 mt-6 border-2 border-text_secondary">
          
          </div>
        <h3 className="rotate-90 absolute top-32 -left-12 text-8xl bg-background_secondary font-cookie text-text_secondary">easy</h3>
        <h3 className="rotate-90 absolute bottom-32 -right-22 text-8xl bg-background_secondary font-cookie text-text_secondary">going</h3>
        </div>
        
  <img
    src="https://res.cloudinary.com/dpxkotl1n/image/upload/v1738022780/TrendAura/wmyudf1nurflbgpfdpr7.png"
    alt=""
    className="h-[580px] z-10 absolute"
  />
</div>

      </div>
    </section>
  );
};

export default HeroSection;
