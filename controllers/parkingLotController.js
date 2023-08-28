const ParkingLot = require("../models/parkingLots");

const createNewParkingLot = async(req,res) => {
    const lotLocation = await ParkingLot.findOne({location: req.body.location});
    if(lotLocation){
        return res.send({
            "success": false,
            "error_code": 404,
            "message": "Parking Lot already exists for this location",
            "data": null
        });
    }

    const lotCapacity = req.body.capacity;
    if(lotCapacity < 5){
        return res.send({
            "success": false,
            "error_code": 404,
            "message": "Parking Lot should have a minimum capacity of 5",
            "data": null
        });
    }

    const lotHourlyRate = req.body.hourlyRate;
    if(lotHourlyRate > 100 || lotHourlyRate < 10){
        return res.send({
            "success": false,
            "error_code": 404,
            "message": "Parking Lot should have hourly rates between 10 to 100",
            "data": null
        });
    }
    
    const newParkingLot = new ParkingLot({
        name: req.body.name,
        location: req.body.location,
        capacity: req.body.capacity,
        hourlyRate: req.body.hourlyRate
    });

    try{
        await ParkingLot.create(newParkingLot);

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully created new parking lot",
            "data": [newParkingLot]
        });
    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};


const fetchAllParkingLots = async(req,res) => {
    try{
        const allParkingLots = await ParkingLot.find();

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched all parking lots",
            "data": allParkingLots
        });

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};


const fetchSingleParkingLot = async(req,res) => {
    const lotID = req.params.id;

    try{
        const singleParkingLot = await ParkingLot.findById(lotID);
        if(!singleParkingLot){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Parking Lot does not exist",
                "data": null
            });
        }

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched the parking lot",
            "data": [singleParkingLot]
        });

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};


const updateSingleParkingLot = async(req,res) => {
    const lotID = req.params.id;

    try{
        const updatedParkingLot = await ParkingLot.findById(lotID);
        if(!updatedParkingLot){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Parking Lot does not exist",
                "data": null
            });
        }

        const lotName = req.body.name;
        const lotLocation = req.body.location;
        if(lotName !== updatedParkingLot.name || lotLocation !== updatedParkingLot.location){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Cannot update name or location of Parking Lot",
                "data": null
            });
        }

        const lotCapacity = req.body.capacity;
        if(lotCapacity <= updatedParkingLot.capacity){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Parking Lot cannot be reduced",
                "data": null
            });
        }

        const lotHourlyRate = req.body.hourlyRate;
        if(lotHourlyRate > 100 || lotHourlyRate < 10){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Parking Lot should have hourly rates between 10 to 100",
                "data": null
            });
        }

        updatedParkingLot.name = lotName;
        updatedParkingLot.location = lotLocation;
        updatedParkingLot.capacity = lotCapacity;
        updatedParkingLot.hourlyRate = lotHourlyRate;

        await updatedParkingLot.save();

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully updated the parking lot",
            "data": [updatedParkingLot]
        });

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};


const deleteSingleParkingLot = async(req,res) => {
    const lotID = req.params.id;

    try{
        const deletedParkingLot = await ParkingLot.findById(lotID);
        if(!deletedParkingLot){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Parking Lot does not exist",
                "data": null
            });
        }

        await deletedParkingLot.deleteOne();

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully deleted the parking lot",
            "data": null
        });

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};

module.exports = {
    createNewParkingLot,
    fetchAllParkingLots,
    fetchSingleParkingLot,
    updateSingleParkingLot,
    deleteSingleParkingLot
} 