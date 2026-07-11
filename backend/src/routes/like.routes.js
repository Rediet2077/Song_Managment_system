const express = require("express");

const router = express.Router();

const {
    addLike
}=require("../controllers/like.controller");


const authMiddleware = require("../middleware/auth.middleware");


router.post(
    "/",
    authMiddleware,
    addLike
);


module.exports = router;