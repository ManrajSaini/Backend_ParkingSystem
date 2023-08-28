const mongoose = require("mongoose");

const parkingLotSchema = new mongoose.Schema({
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

const ParkingLot = mongoose.model("ParkingLot", parkingLotSchema);

module.exports = ParkingLot;