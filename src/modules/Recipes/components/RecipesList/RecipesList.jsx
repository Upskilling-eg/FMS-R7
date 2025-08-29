import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
import { axiosInstance, baseImgURL, CATEGORIES_URLS, RECIPES_URLS, TAGS_URLS, USERS_FAVS_URLS } from "../../../../Services/urls";
import NoData from "../../../Shared/components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from 'react-toastify';
import { AuthContext } from "../../../../context/AuthContext";

export default function RecipesList() {
       let {loginData} = useContext(AuthContext);
  
  let navigate = useNavigate();
  const [tagsList, setTagsList] = useState([])
  const [categoriesList, setCategoriesList] = useState([]);
  const [recipiesList, setRecipesList] = useState([]);
    const [recipeId, setRecipeId] = useState(0);
    const [arrayOfPages, setArrayOfPages] = useState([])
      const [nameValue, setNameValue] = useState("")
      const [tagValue, setTagValue] = useState("")
      const [catValue, setCatValue] = useState("")
  
   const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setRecipeId(id);
      setShow(true);
   };
     let getAllTags =async ()=>{
         try {
               let response = await axiosInstance.get(
                 `${TAGS_URLS.GET_TAGS}`,
               );
               setTagsList(response.data);
             } catch (error) {
               console.log(error);
             }
     }

      let addToFavs = async (recipeId) =>{
         try {
           let response = await axiosInstance.post(
             `${USERS_FAVS_URLS.CREATE_FAV}`, {recipeId:recipeId}
           );
          navigate('/dashboard/favs')
  
         } catch (error) {
           console.log(error);
         }
       }
      const getAllCategories = async (pageSize, pageNumber) => {
         try {
           let response = await axiosInstance.get(
             `${CATEGORIES_URLS.GET_CATEGORIES}`,
             { params: { pageSize, pageNumber} }
           );
           console.log(response.data.data);
           
           setCategoriesList(response.data.data);
         } catch (error) {
           console.log(error);
         }
       };
  const getAllRecipes = async (pageSize, pageNumber,name,tagId,categoryId) => {
      try {
        let response = await axiosInstance.get(
          `${RECIPES_URLS.GET_RECIPIES}`,
          { params: { pageSize, pageNumber  ,name,tagId,categoryId} }
        );
        setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)); 
        setRecipesList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getNameValue =(input)=>{
      setNameValue(input.target.value);
      getAllRecipes(3,1,input.target.value,tagValue,catValue)
  }
   const getTagValue =(input)=>{
     setTagValue(input.target.value);
      getAllRecipes(3,1,nameValue,input.target.value,catValue)
  }
     const getCatValue =(input)=>{
       setCatValue(input.target.value);
      getAllRecipes(3,1,nameValue,tagValue,input.target.value)
  }

    const deleteRecipe = () => {
        try {
          let response = axiosInstance.delete(
            RECIPES_URLS.DELETE_RECIPY(recipeId)
          );
          getAllRecipes();
          handleClose();
          toast.success("Recipe Deleted ");
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getAllRecipes(4, 1);
          getAllTags()
          getAllCategories(10,1)
    }, []);
    
  return (
    <>
      <Header
        imgPath={headerImg}
        title={"Recipes List"}
      description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Recipe"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
       <div className="title d-flex justify-content-between p-4 align-items-center">
        <h5>Recipes Table details</h5>
         {loginData?.userGroup !="SystemUser"? 
        <button className="btn btn-success" onClick={()=>navigate('/dashboard/recipe-data')}>
          Add new recipe
        </button>:''}
      </div>
        <div className="p-4">
          <div className="row">
            <div className="col-md-6">
              <input type="text" placeholder="Search by Name ,,," className="form-control mb-3" onChange={getNameValue}/>
            </div>
            <div className="col-md-3">
             
                 <select className='form-control my-2' onChange={getTagValue}>
         {tagsList.map(tag=><option value={tag.id}>{tag.name}</option>)}
       </select>
            </div>
            <div className="col-md-3">
       <select className='form-control my-2' onChange={getCatValue}>
         {categoriesList.map(cat=><option value={cat.id}>{cat.name}</option>)}
       </select>
            </div>
          </div>
              <table className="table table-striped">
                <thead>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Tag</th>
                  <th>Category</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {recipiesList.length > 0 ? (
                    recipiesList.map((item) => (
                      <tr>
                        <td>{item.name}</td>
                        <td><img className="item-img" src= {`${baseImgURL}${item.imagePath}`} alt="" /></td>
                        <td>{item.description}</td>
                        <td>{item.tag.name}</td>
                        <td>{item.category[0].name}</td>
                        <td>
                          
                          <i className="fa fa-eye mx-2" aria-hidden="true"></i>
                          {loginData?.userGroup =="SystemUser"?<i onClick={()=>addToFavs(item.id)}  class="fa fa-heart text-success" aria-hidden="true"></i>:''}
                          {loginData?.userGroup !="SystemUser"?  <i
                            className="fa fa-edit mx-2 text-warning"
                            aria-hidden="true"
                          ></i>:''}
                           {loginData?.userGroup !="SystemUser"? 
                          <i
                            onClick={() => handleShow(item.id)}
                            className="fa fa-trash text-danger"
                            aria-hidden="true"
                          ></i>:''}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <NoData />
                  )}
                </tbody>
              </table>
                 <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayOfPages.map(pageNo=>   
      <li onClick={()=> getAllRecipes(4, pageNo)} className="page-item"><a className="page-link">{pageNo}</a></li>
    )}

    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
                </nav>
            </div>
    </>
  );
}
