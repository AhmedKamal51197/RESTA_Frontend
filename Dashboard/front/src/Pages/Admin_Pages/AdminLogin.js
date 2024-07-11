import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useHistory } from "react-router-dom";
import bg from "../../Images/bg.jpg";

export function AdminLogin() {
  const [signed, setSigned] = useState(0);
  // const { setCurrentUser } = useContext(AuthContext);
  // const { isLoggedIn, login, logout } = useAuth();
  const [shouldDismissModal, setShouldDismissModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [requestedToReset, setRequestedToReset] = useState(false);
  let history = useHistory();

  // localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
  // localStorage.setItem('cartItems', JSON.stringify(cartItems));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passError: "",
    loginError: "",
  });

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setFormData({
        ...formData,
        email: event.target.value,
      });
      setErrors({
        ...errors,
        emailError:
          event.target.value.length === 0
            ? "This Field is required"
            : !event.target.validity.valid && "Please enter a vaild email",
      });
    } else if (event.target.name === "password") {
      setFormData({
        ...formData,
        password: event.target.value,
      });
      setErrors({
        ...errors,
        passError:
          event.target.value.length === 0
            ? "This Field is required"
            : !event.target.validity.valid && "Please enter a vaild password",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSigned(0);

    console.log(accessToken);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",
        formData
      );
      setIsLoggedIn(true);
      setAccessToken(response.access_token);
      localStorage.setItem("Access-token", JSON.stringify(accessToken));
      history.push("/admin/dashboard/add-ons}");
      console.log(response);

      setErrors({
        ...errors,
        loginError: "",
      });

      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.access_token)
      );
      setAccessToken(JSON.parse(localStorage.getItem("accessToken")));

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);

      setErrors({
        ...errors,
        loginError: "invalid email or password",
      });
    }
  };

  const resetPassword = async (e) => {
    console.log(formData.email);
    if (formData.email === "") {
      setErrors({
        ...errors,
        emailError: "please enter your email to reset your password",
      });
    }

    e.preventDefault();
    var email = { email: formData.email };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/employees/forgot-password",
        email
      );
      setRequestedToReset(true);
    } catch {}
  };
  return (
    <>
      <div className="w-75 color-dark admin-login mx-auto my-5 rounded-pill text-center">
        <form className="mx-auto w-75 p-5" onSubmit={handleSubmit}>
          <div>
            <span className="text-danger">{errors.loginError}</span>
            <br></br>

            <label for="email" className="form-label mt-3">
              Email:
            </label>
            <br></br>
            <span className="text-danger">{errors.emailError}</span>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onBlur={handleInputChange}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label for="password" className="form-label mt-3">
              Password:
            </label>
            <br></br>
            <span className="text-danger">{errors.passError}</span>

            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              value={formData.password}
              onBlur={handleInputChange}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <Link to="/register"> <p data-bs-dismiss="modal">Register</p> </Link> */}
          <div className="d-flex ">
            <a href="" className="" onClick={resetPassword}>
              <p>Forgot password</p>
            </a>
            <span
              className={
                "text-danger ml-5 " +
                (requestedToReset ? "visible" : "invisible")
              }
            >
              Check your email
            </span>
          </div>

          {/* ||  errors.passError */}
          <button
            className="btn btn-dark rounded-pill"
            onClick={handleSubmit}
            type="button"
            disabled={
              errors.emailError ||
              formData.password === "" ||
              formData.email === ""
            }
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}
