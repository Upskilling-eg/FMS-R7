import React from "react";
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
export default function RecipesList() {
  return (
    <>
      <Header
        imgPath={headerImg}
        title={"Recipes List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
    </>
  );
}
