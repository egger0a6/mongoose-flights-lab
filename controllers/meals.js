import { Meal } from "../models/meal.js"

function newMeal(req, res) {
  Meal.find({})
  .then((meals) => {
    res.render("meals/new", {
      meals: meals,
      title: "Add Meal"
    })
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  Meal.create(req.body)
  .then((meal) => {
    res.redirect("/meals/new");
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

export {
  create,
  newMeal as new
}