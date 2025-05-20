import React from 'react'
import logo from '../../../../assets/images/logo1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';

export default function Login({saveLoginData}) {
  let navigate = useNavigate();

  let {register,formState:{errors},handleSubmit} = useForm();
 
  const onSubmit =async (data) =>
  {
    try {
      //success
      let response =await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data);
      localStorage.setItem('token',response.data.token);
      saveLoginData()
      navigate('/dashboard');
      //toastify success
      
    } catch (error) {
      console.log(error);
      //toastify error
    }
  }

  return (
    <div className='auth-container'>
       <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
           <div className="col-md-5 bg-white rounded-3 px-5 py-4 ">
             <div>
                <div className="logo-container text-center">
                   <img className='w-50' src={logo} alt="food-logo" />
                </div>
                <div className="title my-3">
                  <h4 className='h5'>Log In</h4>
                  <span className='text-muted'>Welcome Back! Please enter your details</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input {...register('email',
                    {
                      required:'Email is required',
                      pattern:{
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                        message: 'Email not valid , please enter valid email'
                      }
                    })} type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                    <input {...register('password', {
                      required:'Password is required'
                    })} type="text" className="form-control" placeholder="Passowrd" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  {errors.password&&<span className='text-danger'>{errors.password.message}</span>}

                  <div className="links d-flex justify-content-between mb-3">
                    <Link to='/register' className='text-decoration-none text-black'>Register Now?</Link>
                    <Link to='/forget-pass' className='text-success text-decoration-none'>Forgot Password?</Link>
                  </div>

                  <button className='btn btn-success w-100'>Login</button>
                </form>
             </div>
           </div>
        </div>
       </div>
    </div>
  )
}
