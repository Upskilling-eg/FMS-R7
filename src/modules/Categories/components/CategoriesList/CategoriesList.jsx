import React, { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
import axios from "axios";
import NoData from "../../../Shared/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import { useForm } from "react-hook-form";
import { axiosInstance, CATEGORIES_URLS } from "../../../../Services/urls";
import { toast } from "react-toastify";

export default function CategoriesList() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [catId, setCatId] = useState(0);
  //model delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id);
    setShow(true);
  };
  //modal add
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [categoriesList, setCategoriesList] = useState([]);

  const getAllCategories = async (pageSize, pageNumber) => {
    try {
      let response = await axiosInstance.get(
        `${CATEGORIES_URLS.GET_CATEGORIES}`,
        { params: { pageSize, pageNumber } }
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      getAllCategories();
      handleCloseAdd();
    } catch (error) {
      //
      console.log(error);
    }
  };

  const deleteCategory = () => {
    try {
      // let response = axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`, {headers:{
      let response = axiosInstance.delete(
        CATEGORIES_URLS.DELETE_CATEGORY(catId)
      );
      getAllCategories();
      handleClose();
      toast.success("category Deleted ");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories(3, 1);
  }, []);

  return (
    <>
      <Header
        imgPath={headerImg}
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Category"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>Add category</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(addCategory)}>
            <div className="input-group mb-3">
              <input
                {...register("name", {
                  required: "name is required",
                })}
                type="text"
                className="form-control"
                placeholder="Category name"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
            <button className="btn btn-success">Save</button>

            {/* <Button variant="success" onClick={handleCloseAdd} className='float-end'>
                     Save
                  </Button> */}
          </form>
        </Modal.Body>
      </Modal>
      <div className="title d-flex justify-content-between p-4 align-items-center">
        <h5>Categories Table details</h5>
        <button className="btn btn-success" onClick={handleShowAdd}>
          Add new category
        </button>
      </div>
      <div className="p-4">
        <table className="table table-striped">
          <thead>
            <th>Name</th>
            <th>creationDate</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {categoriesList.length > 0 ? (
              categoriesList.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.creationDate}</td>
                  <td>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    <i
                      className="fa fa-edit mx-2 text-warning"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleShow(item.id)}
                      className="fa fa-trash text-danger"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
