import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      email:"",
      password:""
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault()
    const {email,password}=this.state
    console.log(email,password)
    fetch("https://mern-project-back.vercel.app/login-user",{
      method:"POST",
      corssDomain:true,
      headers:{
        "content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        email,
        password
      })
    }).then((res)=>res.json())
    .then((data)=>{
  console.log(data,"userRegister")
  if (data.message === "Login successful") {
    alert("login successful")
    // Redirect to another page after successful login
    window.location.href='/ideaForm';
  } else {
    // Handle login failure
  }
  
  })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password:e.target.value})}

          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}
