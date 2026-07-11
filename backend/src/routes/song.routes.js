const express = require("express");
const router = express.Router();

const {
    createSong,
    getSongs,
    updateSong
} = require("../controllers/song.controller");


const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");


// Create song
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createSong
);


// Get songs
router.get(
    "/",
    getSongs
);


// Update song
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateSong
);


module.exports = router;