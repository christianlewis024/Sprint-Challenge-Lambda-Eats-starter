import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("please input a name")
    .min(2, "name must be more than 2 characters"),
  email: yup
    .string()
    .email("must be a valid email")
    .required("email is a required field"),
  address: yup.string().required("address is a required field"),
  instructions: yup.string().required("we need to know your flavor!!!"),
  size: yup.string().required("must include a size for your shirt")
});

export default function Form() {
  const [button, setButton] = useState(true);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: "",
    instructions: "",
    size: "",
    terms: "",
    mushroom: "",
    pepperoni: "",
    skittles: "",
    anchovies: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    instructions: "",
    size: "",
    terms: "",
    mushroom: "",
    pepperoni: "",
    skittles: "",
    anchovies: ""
  });

  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButton(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/orders", formState)
      .then(res => {
        setPost(res.data);

        setFormState({
          name: "",
          email: "",
          address: "",
          instructions: "",
          size: "",
          terms: "",
          mushroom: "",
          pepperoni: "",
          skittles: "",
          anchovies: ""
        });
      })
      .catch(err =>
        console.log(
          "something went wrong when submitting your form",
          err.response
        )
      );
  };

  //   const validateChange = e => {
  //     yup
  //       .reach(formSchema, e.target.name)
  //       .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
  //       .then(valid => {
  //         setErrors({
  //           ...errors,
  //           [e.target.name]: ""
  //         });
  //       })
  //       .catch(err => {
  //         setErrors({
  //           ...errors,
  //           [e.target.name]: err.errors[0]
  //         });
  //       });
  //   };

  const inputChange = e => {
    e.persist(); // constantly checking to see what the user is typing in and checking if its valid
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    // validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <Link to={"/"}>
        <div>Home</div>
      </Link>
      {/* <Link to={"/about"}>
                <div>About</div>
            </Link> */}
      <h1>Tell us more about this "Pizza" of yours..</h1>
      <label htmlFor="name">
        Name:
        <input
          id="name" // connects to the htmlFor
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {/* this error 👇 connects with the schema for the first error that we have written */}
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>{" "}
      <br />
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="email"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>{" "}
      <br />
      <label htmlFor="address">
        Address:
        <input
          id="address"
          type="text"
          name="address"
          value={formState.address}
          onChange={inputChange}
        />
        {errors.address.length > 0 ? (
          <p className="error">{errors.address}</p>
        ) : null}
      </label>{" "}
      <br />
      <label htmlFor="instructions">
        Special Instructions?
        <textarea
          id="instructions"
          name="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
        {errors.instructions.length > 0 ? (
          <p className="error">{errors.instructions}</p>
        ) : null}
      </label>{" "}
      <br />
      <label htmlFor="size">
        What size PIZZA would you like?
        <select id="size" name="size" onChange={inputChange}>
          <option value="">--select a pizza size, friend.</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
          <option value="xlarge">Extra large</option>
        </select>
      </label>{" "}
      <br /> <br></br>
      <br></br>
      {/* <label htmlFor="terms">
        All Sales are final, friend.
        <input
          id="terms"
          type="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </label> */}
      <br></br>
      <br></br>
      <label htmlFor="mushroom">
        Mushrooms
        <input
          id="mushroom"
          type="checkbox"
          name="mushroom"
          checked={formState.mushroom}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="pepperoni">
        pepperoni
        <input
          id="pepperoni"
          type="checkbox"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="skittles">
        Skittles
        <input
          id="skittles"
          type="checkbox"
          name="skittles"
          checked={formState.skittles}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="anchovies">
        anchovies
        <input
          id="anchovies"
          type="checkbox"
          name="anchovies"
          checked={formState.anchovies}
          onChange={inputChange}
        />
      </label>
      {/* displaying our post request data */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={button}>Submit</button>
    </form>
  );
}
