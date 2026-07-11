const express = require("express");

const router = express.Router();


const {
    addHistory
}=require("../controllers/history.controller");


const authMiddleware = require("../middleware/auth.middleware");


router.post(
    "/",
    authMiddleware,
    addHistory
);


module.exports = router;