const express = require("express");
const router = express.Router();

const {
    createSong,
    getSongs,
    updateSong,
    deleteSong
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

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteSong
);
module.exports = router;