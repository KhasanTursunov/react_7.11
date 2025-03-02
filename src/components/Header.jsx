import React, { Component } from 'react'

export default class Header extends Component {
    constructor(){
        super()
        this.state = {
            count: 9,
            laylo: "salom",
            dark: "light",
            data: [],
            show: false
        }
    }

    componentDidMount(){
      console.log("Bir marta");
    }
    componentDidUpdate(){
      console.log("Ko'p marta");
    }
    componentWillUnmount(){}
  

    handleDarkMode=()=>{
        if(this.state.dark === "light"){
            this.setState({dark: "dark"})
        }else{
            this.setState({dark: "light"})
        }
    }
  render() {
    return (
      <div>
        <h2>{this.props.title}: {this.state.dark} {this.state.count}</h2>
        <button onClick={()=> this.setState({count: this.state.count + 1})}>increment</button>
        <button onClick={this.handleDarkMode}>Dark mode</button>
        <button onClick={()=> this.setState({show: !this.state.show})}>
            {this.state.show ? "Hide" : "Show more"}
        </button>
        {
            this.state.show &&
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum deserunt quibusdam tempore nulla ex, voluptatem ipsum pariatur. Ipsum, culpa blanditiis? Autem amet quam odio totam exercitationem cumque soluta, minima maxime earum deleniti quae, saepe dicta quasi laborum laudantium illo quisquam perspiciatis odit labore, quidem nam deserunt explicabo obcaecati quia? Earum!</p>
   
        }
        {this.props.year}
      </div>
    )
  }
}
