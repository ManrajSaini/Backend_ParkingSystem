const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    }
});

const ParkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);

module.exports = ParkingLot;