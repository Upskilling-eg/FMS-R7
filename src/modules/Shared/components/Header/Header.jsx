import React from "react";
import { useLocation } from "react-router-dom";
import GirlPhoto from '../../../../assets/images/GirlPhoto.png'
export default function Header({ title, description, imgPath }) {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="container-fluid">
      <div className="row header-container rounded-4 w-100">
        <div className="col-md-8 d-flex align-items-center">
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <img
            src={pathname === "/dashboard" ? GirlPhoto : imgPath}
            alt="header img"
          />
        </div>
      </div>
    </div>
  );
}
