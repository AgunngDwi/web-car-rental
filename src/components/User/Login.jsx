import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import "./LoginUser.css"
import { useNavigate } from 'react-router'
import axios from 'axios'

const Login = () => {
  const [form, setForm] = useState({
        email: "",
        password: "",
  })
  const [succ, setSucc] =useState('')
  const [err, setErr] = useState('')
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]:value})
    }

    const handleSubmit = () => {
      setLoad(true)
        const data = {
            email: form.email,
            password: form.password,
        }

        axios
      .post('https://api-car-rental.binaracademy.org/customer/auth/login' , data)
      .then((res) => {
              localStorage.setItem("token", res.data.access_token)
              localStorage.setItem("role", res.data.role)
              setSucc(alert("ANDA BERHASIL LOGIN"))
              navigate ('/')
      })
      .catch ((err) => {
        if (err.code === "ERR_BAD_REQUEST"){
          setErr(alert(err.response.data.message))
        }
        setLoad(false)
  })
  }


  return (
    <div>
    <Container className='login-user-container'>
        <div>
            <h1>Welcome Back!</h1>
        </div>
        <div className='login-input'>
          <label htmlFor="">Email</label><br />
          <input 
          type="text"  
          placeholder='johndee@gmail.com'
          onChange={handleChange}
          value={form.email}
          name='email'
          />
        </div>
        <div className='login-input'>
          <label htmlFor="">Password</label><br />
          <input 
          type="text" 
          placeholder='6+ karakter' 
          onChange={handleChange}
          value={form.password}
          name='password'
          /><br/>
        <Button variant='primary' onClick={handleSubmit}>{load? "loading..." : "Sign in"}</Button>
        </div><br />
        <div className='signup-account'>
          <a>Don't Have Account? </a>
          <a href="">Sign Up for Free</a>
        </div>
    </Container>
    </div>
    
  )
}

export default Login