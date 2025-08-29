import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerImg from "../../../../assets/images/header.png";
import { axiosInstance, baseImgURL, USERS_FAVS_URLS } from '../../../../Services/urls';
import NoData from '../../../Shared/components/NoData/NoData';

export default function FavList() {
    const [favsList, setFavsList] = useState([]);

     let getAllFavs =async ()=>{
             try {
                   let response = await axiosInstance.get(
                     `${USERS_FAVS_URLS.GET_FAVS}`,
                   );
                   console.log(response);
                   setFavsList(response.data.data);
                 } catch (error) {
                   console.log(error);
                 }
         }
           const deleteFav = (favId) => {
                 try {
                   let response = axiosInstance.delete(
                     USERS_FAVS_URLS.DELETE_FAV(favId)
                   );
                   getAllFavs();
                 } catch (error) {
                   console.log(error);
                 }
               };

            useEffect(() => {
                 getAllFavs()
             }, []);
             
  
  return (
    <>
      <Header
            imgPath={headerImg}
            title={"Fav. List"}
            description={
              "You can now add your items that any user can order it from the Application and you can edit"
            }
          />

          <div className="container">
            <div className="row">
              {favsList.length>0 ? (
                favsList.map(fav=>  
              <div className="col-md-4">
                <div>
                  <img className=" w-50" src= {`${baseImgURL}${fav.recipe.imagePath}`} alt="" />
                  <h3>{fav.recipe.name}</h3>
                  <p>{fav.recipe.description}</p>
                  <i onClick={()=>deleteFav(fav.id)} class="fa fa-heart text-danger" aria-hidden="true"></i>
                </div>
              </div>)
              ) : <NoData/>
            }
            </div>
          </div>
    </>
  )
}
