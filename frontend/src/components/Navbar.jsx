// src/components/Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authslice.js";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex justify-center bg-background_primary">
      <div className="flex flex-row w-[1240px] h-[80px]">
        <div className="basis-1/8 flex items-center">
          <Link to={"/"} className="text-text_primary text-4xl font-logo">
            TrendAura
          </Link>
        </div>
        <div className="basis-4/8 flex justify-around items-center">
          <NavLink
            to="/new"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-gray-600 font-standard"
                : isActive
                ? "bg-text_secondary text-white font-standard"
                : "text-gray-600 font-standard hover:text-gray-900 hover:font-standard"
            }
          >
            NEW
          </NavLink>
          <NavLink
            to="/women"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-gray-600 font-standard"
                : isActive
                ? "bg-text_secondary text-white font-standard"
                : "text-gray-600 font-standard hover:text-gray-900 hover:font-standard"
            }
          >
            WOMEN
          </NavLink>
          <NavLink
            to="/men"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-gray-600 font-standard"
                : isActive
                ? "bg-text_secondary text-white font-standard"
                : "text-gray-600 font-standard hover:text-gray-900 hover:font-standard"
            }
          >
            MEN
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-gray-600 font-standard"
                : isActive
                ? "bg-text_secondary text-white font-standard"
                : "text-gray-600 font-standard hover:text-gray-900 hover:font-standard"
            }
          >
            COLLECTIONS
          </NavLink>
        </div>

        <div className="basis-3/8 flex items-center">
          <div>
            <input type="text" placeholder="search products" className="outline-none w-36" />
            <div className="border-2 border-text_secondary w-32"></div>
          </div>
          <button className="text-3xl mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" className="fill-[#676565] hover:fill-[#0f0f0f]">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
          <button>
            <NavLink to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" className="fill-amber-400 hover:fill-amber-600">
                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
              </svg>
            </NavLink>
          </button>

          {/* Conditionally render login and signup buttons */}
          {!isAuthenticated ? (
            <>
              <button className="border-2 border-text_primary text-text_primary p-1.5 ml-8 rounded-md w-18 font-standard hover:bg-[#cfc7c3]">
                <NavLink to="/login">Log in</NavLink>
              </button>
              <button className="bg-[#705C53] hover:bg-[#5a4942] text-white p-1.5 ml-2 rounded-md w-18 font-standard">
                <NavLink to="/signup">Sign up</NavLink>
              </button>
            </>
          ) : (
            <button className="bg-[#705C53] hover:bg-[#5a4942] text-white p-1.5 ml-2 rounded-md w-18 font-standard" onClick={handleLogout}>
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
