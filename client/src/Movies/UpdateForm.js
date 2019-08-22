import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ButtonContainer } from "../styled-components/Button";
import axios from "axios";

const MovieUpdate = props => {
  const [update, setUpdate] = useState({
    id: props.match.params.id,
    title: "",
    director: "",
    metascore: ""
  });
  const [stars, setStars] = useState([]);
  const changeHandler = event => {
    event.preventDefault();
    setUpdate({ ...update, [event.target.name]: event.target.value });
  };

  const changeHandler2 = event => {
    event.preventDefault();
    setStars({ ...stars, [event.target.name]: [event.target.value] });
  };

  const data = {
    ...update,
    ...stars
  };

  const updateMovie = e => {
    e.preventDefault();
    console.log("update", update);
    console.log("stars", stars);
    console.log("data", data);
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, data)
      .catch(err => console.log(err.response));
    props.history.push(`/`);
  };

  return (
    <div className="updateModal">
      <form className="update-modal" onSubmit={event => updateMovie(event)}>
        <h1 className="updateTitle">Update Movie !</h1>
        <p className="updateInputs">
          <label>
            Title:
            <input
              className="input-modal"
              type="text"
              name="title"
              onChange={changeHandler}
              value={update.title}
            />
          </label>
        </p>

        <p className="updateInputs">
          <label>
            Director:
            <input
              className="input-modal"
              type="text"
              name="director"
              onChange={changeHandler}
              value={update.director}
            />
          </label>
        </p>

        <p className="updateInputs">
          <label>
            Metascore:
            <input
              className="input-modal"
              type="text"
              name="metascore"
              onChange={changeHandler}
              value={update.metascore}
            />
          </label>
        </p>

        <p className="updateInputs">
          <label>
            Stars:
            <input
              className="input-modal"
              type="text"
              name="stars"
              onChange={changeHandler2}
            />
          </label>
        </p>

        <ButtonContainer
          className="button-modal"
          onClick={event => updateMovie(event)}
        >
          Update!
        </ButtonContainer>
      </form>
    </div>
  );
};

export default withRouter(MovieUpdate);