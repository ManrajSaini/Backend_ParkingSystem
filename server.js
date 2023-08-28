const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/connectDB");
const {adminAuthentication} = require("./middlewares/adminAuth");
const parkingLotController = require("./controllers/parkingLotController");
const adminController = require("./controllers/adminController");
const headController = require("./controllers/headController");
const { headAuthentication } = require("./middlewares/headAuth");

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

app.post("/api/admin/lot-head/register", adminAuthentication, adminController.createLotHead);
app.get("/api/admin/lot-head/:id", adminAuthentication, adminController.fetchSingleHead);
app.get("/api/admin/lot-head", adminAuthentication, adminController.fetchAllHeads);
app.delete("/api/admin/lot-head/:id", adminAuthentication, adminController.deleteLotHead);
app.patch("/api/admin/lot-head/:id/unAssignLot", adminAuthentication, adminController.unAssignLot);
app.patch("/api/admin/lot-head/:id/assignLot", adminAuthentication, adminController.assignLot);

app.post("/api/head/login", headController.loginHead);
app.post("/api/head/logout", headAuthentication, headController.logoutHead);
app.post("/api/head/createSpot", headAuthentication, headController.createSpot);



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