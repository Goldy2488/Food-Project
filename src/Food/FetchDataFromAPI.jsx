import React, { useEffect, useState } from "react";
import "./food.css";

const FetchDataFromAPI = () => {
  const [mealData, setMealData] = useState([]);
  const [country, setCountry] = useState("Canadian");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
        );
        const data = await response.json();
        setMealData(data.meals || []); // Handle case where meals is null
      } catch (error) {
        console.error("Error fetching meal data:", error);
      }
    };
    fetchDataFromAPI();
  }, [country]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
      );
      const data = await response.json();
      setMealData(data.meals || []); // Handle case where meals is null
      setInputData(""); // Clear input field after submission
    } catch (error) {
      console.error("Error searching for meals:", error);
    }
  };

  return (
    <>
      <div className="mx-auto text-center" style={{ margin: "20px",borderBottom:"2px solid blue" }}>
        {["Indian", "Canadian", "American", "Thai", "British", "Russian"].map(
          (cuisine, index) => (
            <button
              key={index}
              type="button"
              className={`btn btn-outline-${index % 6}`}
              onClick={() => setCountry(cuisine)}
            >
              {cuisine}
            </button>
          )
        )}
      </div>

      {/* Search Form */}
      <form onSubmit={submitHandler} className="mx-auto text-center">
        <input
          type="text"
          value={inputData}
          placeholder="Search for a meal..."
          onChange={(e) => setInputData(e.target.value)}
          style={{ padding: "10px", margin: "20px", width: "250px" }}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Meal Data Display */}
      <div className="meal-container" >
        {mealData.length > 0 ? (
          mealData.map((data) => (
            <div key={data.idMeal} style={{ textAlign: "center", margin: "10px" }}>
              <img className="meal-img"
                src={data.strMealThumb}
                alt={data.strMeal}
              />
              <h5 >{data.strMeal}</h5>
            </div>
          ))
        ) : (
          <h4>No meals found</h4>
        )}
      </div>
    </>
  );
};

export default FetchDataFromAPI;
