const express = require("express");

const router = express.Router();


const {
    addRating
}=require("../controllers/rating.controller");


const authMiddleware = require("../middleware/auth.middleware");


router.post(
    "/",
    authMiddleware,
    addRating
);


module.exports = router;