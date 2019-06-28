import React from "react";
import axios from "axios";
import "./App.css";





class App extends React.Component {
  state = {
    products: [],
    id: '',
    product_name: '',
    price: '',
    img_url: '',
    data: '',
    toggle: false
  };


  componentDidMount() {
    axios
      .get('api/getProducts')
      .then(response => this.setState({ products: response.data }))
      .catch(console.error);
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // };


  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggle = (id) => this.setState({ id: id, toggle: !this.state.toggle });

  handleCreate = (e) => {
    const { id, price, product_name, img_url } = this.state;
    const body = {
      id: id,
      product_name: product_name,
      price: price,
      img_url: img_url,
      toggle: false
    }
    id != null && price != null && product_name != null ?
      axios.post('/api/createProduct', body)
        // axios.then(() => axios.get('/api/getProducts'));

        .then(response => this.setState({
          products: response.data,
          id: '',
          product_name: '',
          price: '',
          img_url: '',
        }))
        .catch(console.error) : null;
  }

  handleDelete = (id) => {
    let { products } = this.state;
    let body = products;
    axios
      .delete(`/api/deleteProduct/${id}`, { data: body })
      // .then(() => axios.get('/api/getProducts'))
      .then(response => this.setState({ products: response.data, toggle: false }))

  }

  handleUpdate = (id) => {
    const { price, product_name, img_url } = this.state;
    const body = {
      id: id,
      product_name: product_name,
      price: price,
      img_url: img_url,
    }

    if (this.state.id) { body.id = this.state.id; }
    if (this.state.product_name) { body.product_name = this.state.product_name; }
    if (this.state.price) { body.price = this.state.price; }
    if (this.state.img_url) { body.img_url = this.state.img_url; }
    this.setState({ toggle: !this.state.toggle })

    axios
      .put(`/api/updateProduct/${id}`, body)
      // .then(() => axios.get('/api/products'))
      .then(response => this.setState({
        products: response.data,
        id: '',
        product_name: '',
        price: '',
        img_url: '',
      }))
      console.log('product updated')

  }

  render() {
    const add_form = <div className="input_container">
      <input name="id" value={this.state.id} onChange={this.handleChange} placeholder="id" />
      <input name="product_name" value={this.state.product_name} onChange={this.handleChange} placeholder="product_name" />
      <input name="price" value={this.state.price} onChange={this.handleChange} placeholder="price" />
      <input name="image" value={this.state.img_url} onChange={this.handleChange} placeholder="image" />
      <button className="add_btn" onClick={this.handleCreate}>Add new product</button>
    </div>
    const update_form = <div className="update_form"><h2>Update Product?</h2>
      <input name="id" value={this.state.id} onChange={this.handleChange} placeholder="id" />
      <input name="product_name" value={this.state.product_name} onChange={this.handleChange} placeholder="product_name" />
      <input name="price" value={this.state.price} onChange={this.handleChange} placeholder="price" />
      <input name="image" value={this.state.img_url} onChange={this.handleChange} placeholder="image" />
      <button className="submit_btn" onClick={() => this.handleUpdate(this.state.id)}>Submit</button>
      <button className="cancel_btn" onClick={() => this.toggle()}>Cancel</button>
    </div>
    const list = this.state.products.map((product, i) => {
      return (
        <div key={i} className="list_product">
          <div>Product id:{product.id}</div>
          <div>Product:{product.product_name}</div>
          <div>Price: ${product.price}</div>
          <img className="product_img" src={product.img_url}></img>
          <button className="delete_btn" onClick={() => this.handleDelete(product.id)}>Delete</button>
          <button className="update_btn" onClick={() => this.toggle(product.id)}>Update</button>
        </div>
      );
    });
    return (
      <div className="App">
        <div className="header">
          <h3>Lex's Products</h3>
        </div>
        {this.state.toggle ? update_form : null}
        {this.state.toggle ? null:add_form}
        <div className="body">{list}</div>
      </div>

    );
  }
}

export default App;
