const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// create
router.post("/", verify, async (req, res) => {
    if (req.user.id) {
        const newMovie = new Movie(req.body);
        try {
            const movieAdd = await newMovie.save();
            res.status(201).json(movieAdd);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("please login to add movie.")
    }
})

// update
router.put("/:id", verify, async (req, res) => {
    if (req.user.id) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
                {$set: req.body}, {new: true}
            );
            res.status(201).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("please login to update movie.")
    }
})

// delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(201).json("movie deleted.");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("please login to delete movie.")
    }
})

// get specific movie
router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get random
router.get("/random", verify, async (req, res) => {
    try {
        const movie = await Movie.aggregate([{ $sample: {size: 1}}]);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get random 10
router.get("/random10", verify, async (req, res) => {
    try {
        const movies = await Movie.aggregate([{ $sample: {size: 10}}]);
        res.status(201).json(movies);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get all
router.get("/", verify, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(201).json(movies);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router