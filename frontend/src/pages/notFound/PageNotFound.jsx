import React from "react";
import { Link } from "react-router-dom";
import {Logo} from '../../components/index'
function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background_secondary px-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2 mb-2">Oops! Page not found</p>

                  <Logo children="TrendAura" textColor="text-text_primary"  font="font-logo" textSize='text-4xl'/>
    

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
