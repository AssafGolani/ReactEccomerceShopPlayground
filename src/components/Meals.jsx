import { useEffect } from "react";
import { useState } from "react";

export default function Meals() {
  const [loeadMeals, setLoadMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const meals = await response.json();
      setLoadMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loeadMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
