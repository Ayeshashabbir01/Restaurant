import React, { useState } from "react";
import { useGetRestaurantMenusQuery } from "../../services/public/resturants";
import { useParams } from "react-router-dom";
import OrderItemCard from "../../components/OrderItemCard";
import RestaurantsMenuItems from "./RestaurantsMenuItems";

function RestaurantsMenu() {
  const { id } = useParams();
  const { data } = useGetRestaurantMenusQuery(id, { skip: !id });

  return (
    <div className=" w-full mt-28 p-10">
      {data?.results?.map((menu) => (
        <div>
          <h2 className=" text-3xl font-bold text-[#ffcc00]">{menu.name}</h2>
          <div className=" mt-10">
            <RestaurantsMenuItems menu={menu?.menu_items} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantsMenu;
