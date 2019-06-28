const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const ctrl = require("./controller");

const app = express();

app.use(json());
app.use(cors());
const port = process.env.PORT || 5000;
// ctrl = require("./controller");
// let products = require('./products.json');

// // console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
    
});

// app.post('/api/products', (req, res) => {
//     const item = req.body;
//     products.push(item);
//     res.send(item);
// })

// app.put('/api/product/:id', (req, res) => {
//     const itemId = req.params.id;
//     const foundItem = products.find((item) => {
//         products.id === itemId
//     })
//     const index = products.findIndex((item) => products.id === id)
//     const newItem = { ...foundItem };
//     Object.keys(req.body).forEach(key => {
//         newItem[key] = req.body[key]
//     })
//     products.splice(index, 1, foundItem);
//     res.send('changed products');
// })

// app.delete('/api/product/:id', (req, res) => {``
//     const index = products.findIndex((item) => products.id === id);
//     products.splice(index, 1);
//     res.send('deleted')
// })

// app.get('/api/getProducts', ctrl.getProducts)
// app.get('/api/products', (req, res) => {
//     if (req.query.price) {
//         const items = products.filter(val => val.price >= parseInt(req.query.price));
//         return res.status(200).send(items);
//     }
//     res.status(200).send(products);
// });



// app.get('/api/product/:id', (req, res) => {

//     const item = products.find(val => val.id === parseInt(req.params.id));
//     if (!item) {
//         return res.status(500).send("Item not in list");
//     }
//     res.status(200).send(item);
// });


app.get("/api/getProducts", ctrl.getProducts);
app.post("/api/createProduct", ctrl.createProduct);
app.put("/api/updateProduct/:id", ctrl.updateProduct);
app.delete("/api/deleteProduct/:id", ctrl.deleteProduct);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});