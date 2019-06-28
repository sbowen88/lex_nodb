'use strict';

let allProducts = require('./products.json');


const getProducts = (req, res, next) => {
    // console.log('getting products')
    if (allProducts) {
        res.json(allProducts)

    } else {
        res.json(allProducts);
    }
};

const createProduct = (req, res, next) => {
    allProducts.push(req.body);
    res.json(allProducts);
};

const updateProduct = (req, res, next) => {
    let id = req.params.id
    console.log(req.body)
    let {product_name, price, img_url} =req.body;
    for (let i = 0; i < allProducts.length; i++) {
        // console.log(allProducts[i].id)
        if (allProducts[i].id == id) {
            allProducts[i].product_name = product_name;
            allProducts[i].price = price;
            allProducts[i].img_url = img_url;
            
        //   break;
        }
        else{null}
      }
    res.json(allProducts);
};

const deleteProduct = (req, res, next) => {
    const { id } = req.params;
    let currentProducts = req.body
    let newProducts = currentProducts.filter(function (obj) {
        return obj.id != id;
    });
    // console.log(`product ${id} deleted`, newProducts)
    res.json(newProducts);
};


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};