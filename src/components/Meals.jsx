import { useEffect } from "react";
import { useState } from "react";
import { MealItem } from "./MealItem";

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
        <MealItem key={meal.id} {...meal} />
      ))}
    </ul>
  );
}
