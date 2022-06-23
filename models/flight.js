import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  }
},
{
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    default: "DEN"
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true
  },
  departs: {
    type: Date,
    // new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    // default date is one year from current UTC time
    default: () => new Date(Date.now() + (365*24*60*60000)).toISOString().slice(0, 16)
  },
  tickets: [ticketSchema]
},
{
  timestamps: true
});

const Flight = mongoose.model("Flight", flightSchema);

export {
  Flight
}