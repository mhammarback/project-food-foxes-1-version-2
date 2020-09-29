const cityId = "288"; // Atlanta
const cuisineId = "83"; // Seafood
const headers = new Headers({
  'Content-Type': 'application/json',
  'user-key': 'd75a58b23939cfe8f16d3367916f0564'
})

const SEARCH_API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`;

const searchRequest = new Request(SEARCH_API_URL, {
  headers: headers
})

const restaurants = document.getElementById("restaurants")

fetch(searchRequest)
  .then(response => response.json())
  .then(data => {
    console.log(data.restaurants);
    const newRestaurants = data.restaurants.map(item => {
      const name = item.restaurant.name;
      const address = item.restaurant.location.address;
      const averageCost = item.restaurant.average_cost_for_two;
      const rating = item.restaurant.user_rating.aggregate_rating;
      const image = item.restaurant.thumb;
      return { name, address, averageCost, rating, image };
    });
    console.log(newRestaurants);
    newRestaurants.forEach((restaurant) => {
      restaurants.innerHTML += generateHTMLForRestaurants(restaurant);
    });
  });

const generateHTMLForRestaurants = (array1) => {
  let restaurantHTML = "";
  restaurantHTML += `<h3>${array1.name}</h3>`;
  restaurantHTML += `<p>${array1.address}</p>`;
  restaurantHTML += `<p>${array1.averageCost}</p>`;
  restaurantHTML += `<p>${array1.rating}</p>`;
  restaurantHTML += `<img src=${array1.image}>`;
  return restaurantHTML;
};