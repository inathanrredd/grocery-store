const axios = require("axios");

const products = require("./productList.js");

const baseURL = "http://localhost:3000";

products.forEach(async (product) => {
  const response = await axios.post(`${baseURL}/api/products`, product);
  if (response.status != 200)
    console.log(`Error adding ${product.name}, code ${response.status}`);
});