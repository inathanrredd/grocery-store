const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

let products = [];
let id = 0;
let cart = [];

app.post('/api/products', (req,res) => {
    id = id + 1;
    let product = {
        id: id,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.send(product);
})

app.get('/api/products', (req,res) => {
    res.send(products);
});

app.get('/api/products/:id', (req,res) => {
        let id = parseInt(req.params.id);
    let productMap = products.map(product => {
        return product.id;
    });
    let index = productMap.indexOf(id);
    if (index === -1) {
        res.status(404)
            .send("Sorry, that product doesn't exist");
        return;
    }
    let product = products[index];
    res.send(product);
})

app.put('/api/products/:id', (req,res) => {
    let id = parseInt(req.params.id);
    let productMap = products.map(product => {
        return product.id;
    });
    let index = productMap.indexOf(id);
    if (index === -1) {
        res.status(404)
            .send("Sorry, that product doesn't exist");
        return;
    }
    let product = products[index];
    product.name = req.body.name;
    product.price = req.body.price;
    res.send(product);
});

app.delete('/api/products/:id', (req,res) => {
    let id = parseInt(req.params.id);
    let removeIndex = products.map(product => {
        return product.id;
    })
    .indexOf(id);
    if (removeIndex === -1) {
        res.status(404)
            .send("Sorry, that product doesn't exist");
        return;
    }
    products.splice(removeIndex,1);
    res.sendStatus(200);
});

app.get('/api/cart', (req,res) => {
    res.send(cart);
});

app.post('/api/cart/:id', (req,res) => {
    let id = parseInt(req.params.id);
    let productMap = products.map(product => {
        return product.id;
    });
    let index = productMap.indexOf(id);
    if (index === -1) {
        res.status(404)
            .send("Sorry, that product doesn't exist");
        return;
    }
    let q = 1;
    let cartMap = cart.map(item => {
        return item.id;
    });
    let index2 = cartMap.indexOf(id);
    if (index2 === -1) {
        let product = products[index]
        let item = {
            id: id,
            quantity: q,
            name: product.name
        };
        cart.push(item);
        res.send(item);
        return;
    }
    else {
        let item = cart[index2];
        item.quantity = q + item.quantity;
        res.send(item);
    }
});

app.put('/api/cart/:id/:quantity', (req,res) => {
    let id = parseInt(req.params.id);
    let cartMap = cart.map(product => {
        return product.id;
    });
    let index = cartMap.indexOf(id);
    if (index === -1) {
        res.status(404)
            .send("Sorry, that product is not in your cart");
        return;
    }
    let product = cart[index];
    product.quantity = parseInt(req.params.quantity);
    res.send(product);
});

app.delete('/api/cart/:id', (req,res) => {
    let id = parseInt(req.params.id);
    let removeIndex = cart.map(product => {
        return product.id;
    })
    .indexOf(id);
    if (removeIndex === -1) {
        res.status(404)
            .send("Sorry, that product is not in your cart");
        return;
    }
    cart.splice(removeIndex,1);
    res.sendStatus(200);
})

app.listen(3000, () => console.log('Server listening on port 3000!'));