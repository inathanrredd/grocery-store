import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [item, setItem] = useState("");

  const fetchProducts = async() => {
    try {      
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }
  
    const fetchCart = async() => {
    try {      
      const response = await axios.get("/api/cart");
      setCartItems(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }
  // const createTask = async() => {
  //   try {
  //     await axios.post("/api/todo", {task: item, completed: false});
  //   } catch(error) {
  //     setError("error adding a task: " + error);
  //   }
  // }
  // const deleteOneTask = async(task) => {
  //   try {
  //     await axios.delete("/api/todo/" + task.id);
  //   } catch(error) {
  //     setError("error deleting a task" + error);
  //   }
  // }
  const toCart = async(product) => {
    try {
      await axios.post("/api/cart/" + product.id, product);
    } catch(error) {
      setError("error adding product to cart" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);

  // const addTask = async(e) => {
  //   e.preventDefault();
  //   await createTask();
  //   fetchTasks();
  //   setItem("");
  // }

  // const deleteTask = async(task) => {
  //   await deleteOneTask(task);
  //   fetchTasks();
  // }
  const addToCart = async(product) => {
    await toCart(product);
    fetchCart();
  }
  const getItemName = async(id) => {
    const response = await axios.get("/api/products/" + id); //I think this is breaking it
    return response.data.name;
  }
  
  const getItemPrice = async(id) => {
  const response = await axios.get("/api/products/" + id);  //I think this is breaking it
  return response.data.price;
  }
  // render results
  return (
    <div className="App">
      {error}
      <h1>Cart</h1>
      {cartItems.map( item => (
        <div key={item.id}>
            <p>
              {getItemName(item.id)}  {getItemPrice(item.id)} {item.quantity} 
              <button onClick={e => addToCart(item)}>Remove from Cart</button>
            </p>
          
        </div>
      ))}     
      <h1>Products</h1>
      {products.map( item => (
        <div key={item.id}>
            <p>{item.name}  {item.price}</p>
          <button onClick={e => addToCart(item)}>Add to Cart</button>
        </div>
      ))}     
    </div>
  );
}

export default App;