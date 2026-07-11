const express = require("express");

const router = express.Router();

const {
    createSong,
    getSongs
}=require("../controllers/song.controller");


const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

router.get(
    "/",
    getSongs
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createSong
);



module.exports = router;