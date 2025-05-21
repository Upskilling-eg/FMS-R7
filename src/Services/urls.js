import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({ 
  baseURL
  ,headers:{Authorization:localStorage.getItem('token')}
 });
// ****************************** USERS ************************************
export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  FORGET_PASS: `/Users/Reset/Request`,
  RESET_PASS: `/Users/Reset`,
};


// ****************************** categories ************************************

export const CATEGORIES_URLS = {
GET_CATEGORIES:`/Category/`,
DELETE_CATEGORY:(id)=>`/Category/${id}`
};