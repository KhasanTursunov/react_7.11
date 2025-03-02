import React, { Component } from "react";
import axios from "axios";

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
        data: null,
        loading: false
    }
  }
  componentDidMount(){
    this.setState({loading: true})
    axios
        .get("https://dummyjson.com/products")
        .then(res => this.setState({data: res.data.products}))
        .catch()
        .finally(()=> this.setState({loading: false}))
  }
  componentDidUpdate(){}
  componentWillUnmount(){}

  handleQovun = (id) => {alert(id)};

  render() {
    return <div>
        {
            this.state.loading && <h2>loading...</h2>
        }
        {
            this.state.data?.map(product => (
                <div key={product.id}>
                    <img src={product.thumbnail} alt="" />
                    <h3>{product.title}</h3>
                    <button onClick={()=> this.handleQovun(product.id)}>Show more</button>
                    <hr />
                </div>
            ))
        }
    </div>;
  }
}
