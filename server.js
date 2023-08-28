const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/connectDB");
const {adminAuthentication} = require("./middlewares/adminAuth");
const parkingLotController = require("./controllers/parkingLotController");
const parkingLotHeadController = require("./controllers/adminController");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

connectDB();

app.post("/api/parking-lots", adminAuthentication, parkingLotController.createNewParkingLot);
app.get("/api/parking-lots", adminAuthentication, parkingLotController.fetchAllParkingLots);
app.get("/api/parking-lots/:id", adminAuthentication, parkingLotController.fetchSingleParkingLot);
app.patch("/api/parking-lots/:id", adminAuthentication, parkingLotController.updateSingleParkingLot);
app.delete("/api/parking-lots/:id", adminAuthentication, parkingLotController.deleteSingleParkingLot);

app.post("/api/admin/lot-head/register", adminAuthentication, parkingLotHeadController.createLotHead);
app.get("/api/admin/lot-head/:id", adminAuthentication, parkingLotHeadController.fetchSingleHead);
app.get("/api/admin/lot-head", adminAuthentication, parkingLotHeadController.fetchAllHeads);
app.delete("/api/admin/lot-head/:id", adminAuthentication, parkingLotHeadController.deleteLotHead);
app.patch("/api/admin/lot-head/:id/unAssignLot", adminAuthentication, parkingLotHeadController.unAssignLot);
app.patch("/api/admin/lot-head/:id/assignLot", adminAuthentication, parkingLotHeadController.assignLot);



// Home Route
app.get("/", (req,res) => {
    res.send({
        "success": true,
        "error_code": null,
        "message": "Server is Running",
        "about": "Designed a real life system design problem about how Parking Lot Systems Work."
    });
});

app.listen(9000 || process.env.PORT, ()=> {
    console.log("Server Started");
});