import { Flight } from "../models/flight.js";

function index(req, res) {
  Flight.find({})
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
    res.redirect("/flights");
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
  .then((flight) => {
    res.render("flights/show", {
      flight: flight,
      title: "Flight Details"
    });
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
  newFlight as new,
  deleteFlight as delete
}