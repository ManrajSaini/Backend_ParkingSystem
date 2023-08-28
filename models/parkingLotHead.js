const mongoose = require("mongoose");

const parkingLotHeadSchema = new mongoose.Schema({
    headName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    assignedParkingLot: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingLot',
        required: true
    }]
});

const LotHead = mongoose.model("LotHead", parkingLotHeadSchema);

module.exports = LotHead;