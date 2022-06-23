import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js"

function index(req, res) {
  // find all flights and sort in ascending order by departure date
  Flight.find({}).sort({departs: 1})
  .then((flights) => {
    res.render("flights/index", {
      flights: flights,
      title: "All Flights"
    });
  })
  .catch(error => {
    console.log(error);
    res.redirect("/");
  })
}

function create(req, res) {
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then((flight) => {
    res.redirect(`/flights/${flight._id}`);
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight"
  });
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then((flight) => {
    res.redirect("/flights");
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate("meals")
  .then((flight) => {
    Meal.find({_id: {$nin: flight.meals}})
    .then((allMeals) => {
      res.render("flights/show", {
        flight: flight,
        allMeals: allMeals,
        title: "Flight Details"
      });
    })
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then((flight) => {
    res.render("flights/edit", {
      flight: flight,
      title: "Edit Flight Details"
    });
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

function update(req, res) {
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((flight) => {
    res.redirect(`/flights/${flight._id}`);
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then((flight) => {
    flight.tickets.push(req.body);
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`);
    })
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

function addToMeals(req, res) {
  Flight.findById(req.params.id)
  .then((flight) => {
    flight.meals.push(req.body.mealId);
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`);
    })
  })
  .catch((error) => {
    console.log(error);
    res.redirect("/");
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  createTicket,
  addToMeals,
  newFlight as new,
  deleteFlight as delete
}