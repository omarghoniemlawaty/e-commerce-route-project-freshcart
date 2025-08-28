import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { mainFormHandlerTypeRaw } from "../../util/http.jsx";
import { CartContext } from "../../Store/CartContext.jsx";
import Button from "../Ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const FormComponentBM = ({
  detailsInputs,
  method,
  url,
  inputStyle,
  initialValues,
  validationSchema,
  success,
  token,
  btn,
}) => {
  const navigate = useNavigate();
  const { setToken, fetchCart } = useContext(CartContext);
  const [message, setMessage] = useState();

  const onSubmit = async (values) => {
    const responsive = await mainFormHandlerTypeRaw({
      method,
      type: url,
      fromData: values,
      token,
    });

    setMessage(responsive);

    setTimeout(() => {
      setMessage("");
    }, 3000);

    if (token === undefined && url === "api/v1/auth/signin") {
      localStorage.setItem("token", JSON.stringify(responsive?.data.token));
      setToken(responsive?.data.token);
    }

      (responsive?.data?.message !== undefined ||
      responsive.status === 200 ||
      responsive.status === 201) &&
      (responsive?.data?.message === "success" ||
      responsive.status === 200 ||
      responsive.status === 201) &&
      navigate(success);
    fetchCart();
  };
  
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              {detailsInputs.map(
                ({ name, type, label, autocomplete, ...props }, index) => {
                  return (
                    <div key={index} className="position-relative">
                      {label !== undefined && (
                        <label htmlFor={name}>{label}</label>
                      )}
                      <Field
                        id={name}
                        name={name}
                        type={type}
                        autoComplete={autocomplete}
                        {...props}
                        className={`${inputStyle}`}
                      />
                      <ErrorMessage name={name}>
                        {(errorMsg) => (
                          <p
                            style={{
                              color: "#962118",
                              position: "absolute",
                              bottom: -20,
                            }}
                          >
                            {errorMsg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>
                  );
                }
              )}
              <Button
                className="submit px-4 py-1 mt-4 mb-2"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <ScaleLoader color="#d9dddf" height="25px" />
                ) : (
                  ` ${btn} `
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>

      {message?.response?.data?.message !== undefined && (
        <h5 style={{ color: "#962118" , fontSize:15}}>{message?.response?.data?.message}</h5>
      )}
    </>
  );
};

export default FormComponentBM;
