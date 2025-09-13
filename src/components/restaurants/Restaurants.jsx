import React from "react";
import { useGetRestaurantsQuery } from "../../services/public/resturants";
import { Link } from "react-router-dom";

function Restaurants() {
  const { data: restaurants, isLoading } = useGetRestaurantsQuery();

  console.log("restaurants");

  return (
    <div className="min-h-screen bg-black p-6">
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: "#ffcc00" }}
      >
        Our Restaurants
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-6 ">
        {restaurants?.results?.map((restaurant) => (
          <div
            key={restaurant.id}
            className="rounded-lg shadow-lg  w-fit"
            style={{ backgroundColor: "#111" }}
          >
            {/* Restaurant Image Placeholder */}
            <div className="h-48 flex items-center justify-center">
              <svg
                className="w-20 h-20"
                style={{ color: "#cdb144" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
              </svg>
            </div>

            <div className="p-6">
              <h2
                className="text-xl font-bold mb-2"
                style={{ color: "#ffcc00" }}
              >
                {restaurant.name}
              </h2>

              <p className="mb-4 break-words text-wrap w-80" style={{ color: "white" }}>
                {restaurant.description}
              </p>

              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <svg
                    className="w-5 h-5 mr-2"
                    style={{ color: "#cdb144" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span style={{ color: "white" }}>{restaurant.address}</span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    style={{ color: "#cdb144" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span style={{ color: "white" }}>
                    {restaurant.phone_number}
                  </span>
                </div>
              </div>

              <Link
                to={`/${restaurant.id}/menu`}
                className="block w-full py-2 text-center font-semibold rounded transition-colors duration-300"
                style={{
                  backgroundColor: "#ffcc00",
                  color: "black",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#cdb144";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#ffcc00";
                }}
              >
                View Menu
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
