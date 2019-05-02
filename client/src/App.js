import React, { Component } from 'react'
import './App.css'
// $ is a shortcut for jQuery methods
import $ from 'jquery'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { bananasReceived: "" }
    this.getBananas = this.getBananas.bind(this)
  }
  login() {
    const email = $("#email").val()
    const password = $("#password").val()
    const request = { "auth": { "email": email, "password": password } }
    console.log(request)
    $.ajax({
      url: "/user_token",
      type: "POST",
      data: request,
      dataType: "json",
      success: function (result) {
        console.log(result)
        localStorage.setItem("jwt", result.jwt)
      }
    })
  }
  getBananas() {
    let token = "Bearer " + localStorage.getItem("jwt")
    console.log(token)
    $.ajax({
      url: "/bananas",
      type: "GET",
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        console.log(result)
        this.setState({ bananasReceived: JSON.stringify(result) })
      }
    })
  }
  render() {
    return (
      <div className="App">
        <h1 style={{ marginTop: "20vh", marginBottom: "5vh" }}>
          Banana Management System
        </h1>
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            id="email"
            type="email"
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            id="password"
            type="password"
          />
        </form>
        <br />
        <button
          onClick={this.login}
        >
          Login
          </button>
        <br />
        <button
          onClick={this.getBananas}
          style={{ marginTop: "10vh" }}
        >
          Get Bananas
        </button>
        <p>{this.state.bananasReceived}</p>
      </div>
    );
  }
}

export default App