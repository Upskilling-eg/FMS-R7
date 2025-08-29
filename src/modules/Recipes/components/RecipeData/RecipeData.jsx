import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosInstance, CATEGORIES_URLS, RECIPES_URLS, TAGS_URLS } from '../../../../Services/urls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function RecipeData() {
  const [tagsList, setTagsList] = useState([])
  const [categoriesList, setCategoriesList] = useState([]);
  let navigate = useNavigate()

  let {register,formState:{errors},handleSubmit} = useForm();

  const appendToFormData=(data)=>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("price",data.price);
    formData.append("description",data.description);
    formData.append("categoriesIds",data.categoriesIds);
    formData.append("tagId",data.tagId);
    formData.append("recipeImage",data.recipeImage[0]);
    return formData;
  }

  let onSubmit = async (data) =>{
    let recipeData = appendToFormData(data);
    try {
      let response = await axiosInstance.post(
        `${RECIPES_URLS.CREATE_RECIEPY}`,recipeData
      );
     toast.success(response.data.message);
     navigate('/dashboard/recipes')
      
     
    } catch (error) {
      console.log(error);
    }
  }

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
   const getAllCategories = async (pageSize, pageNumber) => {
      try {
        let response = await axiosInstance.get(
          `${CATEGORIES_URLS.GET_CATEGORIES}`,
          { params: { pageSize, pageNumber } }
        );
        console.log(response.data.data);
        
        setCategoriesList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    getAllTags()
    getAllCategories()
  }, [])
  
  return (
    <>
    <div className="container recipe-header p-4">
       <div className="row">
        <div className="col-md-8 d-flex align-items-center">
          <div>
          <h5>Fill the Recipes !</h5>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
          </div>
        
        </div>
        <div className="col-md-4 d-flex justify-content-end align-items-center">
          <button onClick={()=>navigate('/dashboard/recipes')} className='btn btn-success'>All Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
       </div>
 
    </div>
    <div className='w-75 m-auto p-4' >
    <form onSubmit={handleSubmit(onSubmit)}>
      <input  type='text' className='form-control my-2' placeholder='Recipe Name' {...register('name',{required:'field is required'})}
       />
       {errors.name&&<span className='text-danger'>{errors.name.message}</span>}

       <select className='form-control my-2'  {...register('tagId',{required:'field is required'})}>
         {tagsList.map(tag=><option value={tag.id}>{tag.name}</option>)}
       </select>
       {errors.tagId&&<span className='text-danger'>{errors.tagId.message}</span>}

       
      <input  type='number' className='form-control my-2' placeholder='Recipe price' {...register('price',{required:'field is required'})}
       />
              {errors.price&&<span className='text-danger'>{errors.price.message}</span>}

      <select className='form-control my-2'  {...register('categoriesIds',{required:'field is required'})}>
         {categoriesList.map(cat=><option value={cat.id}>{cat.name}</option>)}
       </select>

       {errors.categoriesIds&&<span className='text-danger'>{errors.categoriesIds.message}</span>}

       <textarea className='form-control my-2' placeholder='Recipe description'  {...register('description',{required:'field is required'})}></textarea>
       {errors.description&&<span className='text-danger'>{errors.description.message}</span>}

       <input type="file" className='form-control my-2'  {...register('recipeImage',{required:'field is required'})}/>
       <div className="btns d-flex justify-content-end">
       <button className='btn btn-success mx-2'>Save</button>
       <button  onClick={()=>navigate('/dashboard/recipes')} className='btn btn-outline-success'>Cancel</button>
       </div>
      

    </form>
    </div>
   
    </>
  )
}
