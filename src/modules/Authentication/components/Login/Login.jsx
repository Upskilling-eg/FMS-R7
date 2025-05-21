import React from 'react'
import logo from '../../../../assets/images/logo1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../Services/urls';
import { EMAIL_VALIDATION } from '../../../../Services/validations';

export default function Login({saveLoginData}) {
  let navigate = useNavigate();

  let {register,formState:{errors},handleSubmit} = useForm();
 
  const onSubmit =async (data) =>
  {
    try {
      //success
      let response =await axiosInstance.post(USERS_URLS.LOGIN,data);
      localStorage.setItem('token',response.data.token);
      saveLoginData()
      navigate('/dashboard');
      //toastify success
            toast.success( "login success")
      
    } catch (error) {
      console.log(error.response.data.message);
      //toastify error
      toast.error(error?.response?.data?.message || "login failed")
    }
  }

  return <>
                <div className="title my-3">
                  <h4 className='h5'>Log In</h4>
                  <span className='text-muted'>Welcome Back! Please enter your details</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input {...register('email',EMAIL_VALIDATION
                    )} type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                    <input {...register('password', {
                      required:'Password is required'
                    })} type="password" className="form-control" placeholder="Passowrd" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                  {errors.password&&<span className='text-danger'>{errors.password.message}</span>}

                  <div className="links d-flex justify-content-between mb-3">
                    <Link to='/register' className='text-decoration-none text-black'>Register Now?</Link>
                    <Link to='/forget-password' className='text-success text-decoration-none'>Forgot Password?</Link>
                  </div>

                  <button className='btn btn-success w-100'>Login</button>
                </form>
</>
}
