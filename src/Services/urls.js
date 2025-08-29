import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const baseImgURL ="https://upskilling-egypt.com:3006/"

export const axiosInstance = axios.create({ 
  baseURL
  ,headers:{Authorization:localStorage.getItem('token')}
 });
// ****************************** USERS ************************************
export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  FORGET_PASS: `/Users/Reset/Request`,
  RESET_PASS: `/Users/Reset`,
  //
  //
  //
};


// ****************************** categories ************************************

export const CATEGORIES_URLS = {
GET_CATEGORIES:`/Category/`,
DELETE_CATEGORY:(id)=>`/Category/${id}`,
//
//
//
};

// ****************************** recipes ************************************

export const RECIPES_URLS = {
  GET_RECIPIES:`/Recipe/`,
  CREATE_RECIEPY:`/Recipe/`,
  DELETE_RECIPY:(id)=>`/Recipe/${id}`
  };


  // ****************************** tags ************************************
  export const TAGS_URLS = {
    GET_TAGS:`/tag/`,
    };
    // ****************************** user recipes ************************************
 export const USERS_FAVS_URLS = {
    GET_FAVS:`/userRecipe/`,
    CREATE_FAV:`/userRecipe/`,
    DELETE_FAV:(id)=>`/userRecipe/${id}`
 };