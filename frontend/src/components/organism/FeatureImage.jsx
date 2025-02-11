import React from 'react'



function FeatureImage() {
  const featureImage = "https://res.cloudinary.com/dpxkotl1n/image/upload/v1738612865/TrendAura/ge115pzztmdnwly3efv8.jpg"
  return (
    <div className="relative flex justify-center pb-16">
  {/* Background Image */}
  <img
  src={featureImage}
  alt="feature image"
  className="rounded-2xl w-[1240px] h-[600px] object-cover blur-xs"
  onError={(e) => {
    console.error("Image failed to load:", e.target.src);
    e.target.src = "/path/to/fallback-image.jpg"; 
  }}
/>

  {/* Text Overlay */}
  <div className="absolute inset-0 flex flex-col justify-center items-center rounded-2xl">
    <h2 className="text-5xl font-bold text-white text-center mb-4">
      Discover Your Style
    </h2>
    <p className="text-xl text-white text-center max-w-2xl">
      Explore the latest trends in fashion and elevate your wardrobe with our exclusive collection.
    </p>
    <button className="mt-8 bg-white text-gray-800 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all">
      Shop Now
    </button>
  </div>
</div>
  )
}

export default FeatureImage