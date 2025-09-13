import { publicApi } from ".";

export const restaurantsApi = publicApi.injectEndpoints({
  endpoints: (build) => ({
    getRestaurants: build.query({
      query: (params) => ({
        url: "/restaurants/restaurants/?limit=100",
        method: "GET",
        params,
      }),
      providesTags: ["Restaurant"],
    }),
    
    getRestaurant: build.query({
      query: (id) => ({
        url: `/restaurants/restaurants/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Restaurant", id }],
    }),
    
    getRestaurantMenus: build.query({
      query: (restaurant_id) => ({
        url: `/restaurants/restaurants/${restaurant_id}/menus/`,
        method: "GET",
      }),
      providesTags: (result, error, restaurant_id) => [{ type: "Menu", restaurant_id }],
    }),
    
    getMenu: build.query({
      query: ({ restaurant_id, id }) => ({
        url: `/restaurants/restaurants/${restaurant_id}/menus/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Menu", id }],
    }),
  }),
});

export const { 
  useGetRestaurantsQuery, 
  useGetRestaurantQuery, 
  useGetRestaurantMenusQuery, 
  useGetMenuQuery 
} = restaurantsApi;