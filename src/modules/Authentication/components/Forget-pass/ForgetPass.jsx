import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION } from "../../../../Services/validations";
import { axiosInstance, USERS_URLS } from "../../../../Services/urls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPass() {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      //success
      let response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data);

      navigate("/reset-password",{state:data.email});
      //toastify success
      toast.success("check your mail");
    } catch (error) {
      console.log(error.response.data.message);
      //toastify error
      toast.error(error?.response?.data?.message || "login failed");
    }
  };
  return (
    <>
      <div className="title my-3">
        <h4 className="h5">Forgot Your Password?</h4>
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
            {...register("email", EMAIL_VALIDATION)}
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

        <button disabled={isSubmitting} className="btn btn-success w-100">
          {isSubmitting ? "Submitting..." : "submit"}
        </button>
      </form>
    </>
  );
}
