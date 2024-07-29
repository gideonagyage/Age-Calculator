import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(null);

  const handleBirthdateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    // Prevent selecting future dates
    if (selectedDate <= today) {
      setBirthdate(event.target.value);
    } else {
      alert("Please select a valid past date.");
      setBirthdate("");
    }
  };

  const submitAge = () => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // if user has not selected a date
    if (!birthdate) {
      alert("Please select a birthdate past date.");
      setBirthdate("");
      setAge(null);
    } else if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // show the age if user has selected a date
    if (birthdate) {
      setAge(age);
    }
  };

  const resetAge = () => {
    setBirthdate("");

    setAge(null);
  };

  return (
    <div className="container m-5 text-center">
      <div className="card w-75 text-center m-lg-auto m-md-auto bg-gray rounded-4 shadow">
        <div className="card-body">
          <h2 className="card-header text-center text-dark bg-transparent pb-4">
            Age Calculator 🗓️
          </h2>
          <form className="my-3">
            <div className="form-group text-center">
              <label
                htmlFor="birthdate"
                className="form-label text-dark fw-bold"
              >
                Choose birthdate:
              </label>
              <input
                type="date"
                className="form-control m-auto w-auto border-1 border-dark"
                id="birthdate"
                value={birthdate}
                onChange={handleBirthdateChange}
              />
            </div>
            <div className="row-12 text-center">
              <button
                type="button"
                className="btn btn-success btn-block m-3 w-25 col rounded-4"
                onClick={submitAge}
              >
                Submit
              </button>

              <button
                type="button"
                className="btn btn-danger btn-block m-3 w-25 col rounded-4"
                onClick={resetAge}
              >
                Reset
              </button>
            </div>
          </form>
          {age !== null && (
            <p className="m-2 text-center card-footer text-dark bg-transparent pt-2">
              Your age is: {age}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgeCalculator;
