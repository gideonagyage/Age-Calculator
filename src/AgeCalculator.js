import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState(null); // Add error state

  const handleBirthdateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    // Basic date validation
    if (isNaN(selectedDate.getTime())) {
      setError("Please enter a valid date format.");
      setBirthdate("");
      return;
    }

    // Prevent selecting future dates
    if (selectedDate <= today) {
      setBirthdate(event.target.value);
      setError(null); // Clear error if valid
    } else {
      setError("Please select a date in the past.");
      setBirthdate("");
    }
  };

  const submitAge = () => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    // Validate date format
    if (isNaN(birthDate.getTime())) {
      setError("Please enter a valid date format.");
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setAge(age);
    setError(null); // Clear error if successful
  };

  const resetAge = () => {
    setBirthdate("");
    setAge(null);
    setError(null);
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
              {error && <p className="text-danger">{error}</p>}
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
