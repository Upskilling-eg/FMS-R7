import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../Services/urls";
import { toast } from "react-toastify";
import { EMAIL_VALIDATION } from "../../../../Services/validations";

export default function ResetPass() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({ defaultValues: { email: location.state }, mode: "onChange" });
  const [isFirstPasswordVisible, setIsFirstPasswordVisible] = useState(false);
  const onSubmit = async (data) => {
    try {
      //success
      let response = await axiosInstance.post(USERS_URLS.RESET_PASS, data);

      navigate("/login");
      //toastify success
      toast.success("success operation");
    } catch (error) {
      console.log(error.response.data.message);
      //toastify error
      toast.error(error?.response?.data?.message || "Failed");
    }
  };

  useEffect(() => {
    if (watch("confirmPassword")) {
      trigger("confirmPassword");
    }
  }, [watch("password"), trigger, watch]);

  return (
    <>
      <div className="title my-3">
        <h4 className="h5"> Reset Password</h4>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            {...register("email")}
            disabled
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            {...register("seed", {
              required: "OTP is required",
            })}
            type="number"
            className="form-control"
            placeholder="OTP"
          />
        </div>
        {errors.seed && (
          <span className="text-danger">{errors.seed.message}</span>
        )}

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={isFirstPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <button
            type="button"
            onClick={() => setIsFirstPasswordVisible((prev) => !prev)}
            className="input-group-text"
            onMouseDown={(e) => e.preventDefault()}
            onMouseUp={(e) => e.preventDefault()}
            id="basic-addon1"
          >
            <i
              className={`fa-solid ${
                isFirstPasswordVisible ? "fa-eye" : "fa-eye-slash"
              } `}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            {...register("confirmPassword", {
              required: "confirmPassword is required",
              validate: (confirmPassword) =>
                confirmPassword === watch("password")
                  ? ""
                  : "password donot match",
            })}
            type={isFirstPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="confirmPassword"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onMouseUp={(e) => e.preventDefault()}
            onClick={() => setIsFirstPasswordVisible((prev) => !prev)}
            className="input-group-text"
            id="basic-addon1"
          >
            <span className="sr-only">
              {isFirstPasswordVisible ? "hidePassword" : "showPassword"}
            </span>
            <i
              className={`fa-solid ${
                isFirstPasswordVisible ? "fa-eye" : "fa-eye-slash"
              } `}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-danger">{errors.confirmPassword.message}</span>
        )}

        <button disabled={isSubmitting} className="btn btn-success w-100">
          {isSubmitting ? "Submitting..." : "submit"}
        </button>
      </form>
    </>
  );
}
