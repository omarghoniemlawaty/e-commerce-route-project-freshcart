import { useValidation } from "../../../Hooks/useValidation.js";
import FormComponentBM from "../../../Components/Form/FormComponentBM.jsx";
import * as Yup from "yup";
import { detailsInputs } from "../../../Logic/DetailsInputs.js";
import { Col, Container, Row } from "react-bootstrap";
import Style from "../Authentication.module.css";
import loginImage from "../../../images/laptop.webp";
import iconGoogle from "../../../images/icon-google.webp";
import iconFacebook from "../../../images/icon-facebook.webp";
import { Link } from "react-router-dom";

const Login = () => {
  const { email, password } = useValidation();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: email,
    password: password,
  });

  const userData = ["email", "password"];
  const filterData = detailsInputs.filter((detailsInput) =>
    userData.includes(detailsInput.name)
  );

  return (
    <div
      className={`${Style.coverLoginPage} d-flex justify-content-center align-items-center w-100`}
    >
      <Container>
        <Row>
          <Col md={12}>
            <div className="w-100 h-50 d-flex flex-wrap justify-content-center my-5">
              <Col lg={6} md={6} sm={8} xs={8}>
                <div className="Login_form_content m-1 m-auto">
                  <h3 className="text-center fw-bold">Login</h3>
                  <FormComponentBM
                    detailsInputs={filterData}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    url={"api/v1/auth/signin"}
                    method={"post"}
                    inputStyle={`input w-100 p-1 m-1 field mb-4 fs-6`}
                    success={"../"}
                    btn={"login"}
                  />
                  <Link className="link text-dark ms-3 " to={"../register"}>
                    Create a new account
                  </Link>
                  <button className="px-4 py-1 google_btn border-0 text-black">
                    <img
                      src={iconFacebook}
                      className={`${Style.icon_facebook} me-1`}
                      alt="icon-facebook"
                      width={18}
                    />
                    Sign Up With Facebook
                  </button>

                  <button className="px-4 py-1 facebook_btn border-0 text-black ">
                    <img src={iconGoogle} alt="icon-google" width={20} /> Sign
                    Up With Google
                  </button>
                </div>
              </Col>

              <Col lg={6} md={12} sm={12} xs={12}>
                <div
                  className={`${Style.sign_text} d-flex flex-wrap align-items-center justify-content-center main-color`}
                >
                  <img
                    className={"mt-1 mb-5 w-100"}
                    src={loginImage}
                    alt="img"
                  />
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
