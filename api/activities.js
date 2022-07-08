const express = require('express');
const router = express.Router();
const { createUser, getUserByUsername } = require("./users");
const { userTakenError } = require("../errors");
const { getAllActivities, getActivityById } = require('../db');
const res = require('express/lib/response');

// GET /api/activities/:activityId/routines



// GET /api/activities

// POST /api/activities
router.post("/api/activities", async (req, res, next) => {
//go get the activites
//get all activitres
const { id, name, description} = req.body
try {
    const activity = await getAllActivities()
    res.send({
        id: activity.id,
        name: name,
        description: description
    })
    
} catch (error) {
    console.error(error)
    next(error);
}
});


// PATCH /api/activities/:activityId
router.patch("/api/activities/:activityId", async (req, res, next) => {

});


module.exports = router;
