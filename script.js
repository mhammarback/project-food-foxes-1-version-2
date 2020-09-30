const cityId = "288"; // Atlanta
const cuisineId = "83"; // Seafood
const cheapestFirst = "&sort=cost&order=asc";
const expensiveFirst = "&sort=cost&order=desc";
const headers = new Headers({
  'Content-Type': 'application/json',
  'user-key': 'd75a58b23939cfe8f16d3367916f0564'
});

const SEARCH_API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`;
const CHEAP_SEARCH_API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}${cheapestFirst}`;
const EXPENSIVE_SEARCH_API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}${expensiveFirst}`;

const searchRequest = new Request(SEARCH_API_URL, {
  headers: headers
});

const cheapSearchRequest = new Request(CHEAP_SEARCH_API_URL, {
  headers: headers
});

const expensiveSearchRequest = new Request(EXPENSIVE_SEARCH_API_URL, {
  headers: headers
});

const restaurants = document.getElementById("restaurants");
const filterButton = document.getElementById('filterSubmit');
const checkElements = document.querySelectorAll('.rating');

const showRandomResults = () => {
  restaurants.innerHTML = "";
  fetch(searchRequest)
    .then(response => response.json())
    .then(data => {
      const restaurantArray = data.restaurants;
      getRestaurantInfo(restaurantArray);
      newRestaurants.forEach((restaurant) => {
        restaurants.innerHTML += generateHTMLForRestaurants(restaurant);
      });
    });
};
showRandomResults();

displayFilteredRestaurants = (array) => {
  let filteredRestaurants = [];
  checkElements.forEach((rating) => {
    if (rating.checked) {
      const partOfFilteredRestaurants = array.filter(item => {
        return Math.round(item.rating) === parseInt(rating.value);
      });
      filteredRestaurants = [...filteredRestaurants, ...partOfFilteredRestaurants];
    }
  })
  return filteredRestaurants;
};

const generateHTMLForRestaurants = (array1) => {
  let restaurantHTML = "";
  restaurantHTML += `<div class="box"><h3>${array1.name}</h3>`;
  restaurantHTML += `<p>${array1.address}</p>`;
  restaurantHTML += `<p>${array1.averageCost} &#36 </p>`;
  restaurantHTML += `<p>${array1.rating} &#11088</p>`;
  restaurantHTML += `<img src=${array1.image}></div>`;
  return restaurantHTML;
};

const sortOnCheapest = () => {
  restaurants.innerHTML = "";
  fetch(cheapSearchRequest)
    .then(response => response.json())
    .then(data => {
      const restaurantArray = data.restaurants;
      getRestaurantInfo(restaurantArray);
      newRestaurants.forEach((restaurant) => {
        restaurants.innerHTML += generateHTMLForRestaurants(restaurant);
      });
    });
};

const sortOnExpensive = () => {
  restaurants.innerHTML = "";
  fetch(expensiveSearchRequest)
    .then(response => response.json())
    .then(data => {
      const restaurantArray = data.restaurants;
      getRestaurantInfo(restaurantArray);
      newRestaurants.forEach((restaurant) => {
        restaurants.innerHTML += generateHTMLForRestaurants(restaurant);
      });
    });
};

filterButton.addEventListener('click', () => {
  const filteredRestaurants = displayFilteredRestaurants(newRestaurants);
  restaurants.innerHTML = '';
  filteredRestaurants.forEach((restaurant) => {
    restaurants.innerHTML += generateHTMLForRestaurants(restaurant);
  });
})

let newRestaurants = [];
const getRestaurantInfo = (array) => {
  array.forEach(item => {
    const name = item.restaurant.name;
    const address = item.restaurant.location.address;
    const averageCost = item.restaurant.average_cost_for_two;
    const rating = parseFloat(item.restaurant.user_rating.aggregate_rating);
    const image = item.restaurant.featured_image;
    newRestaurants.push({ name, address, averageCost, rating, image });
  });
}
