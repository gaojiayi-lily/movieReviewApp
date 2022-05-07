const router = require("express").Router();
const User = require("../models/User");
const Review = require("../models/Review");
const verify = require("../verifyToken");

// create
router.post("/:movieId", verify, async (req, res) => {
    if (req.user.id) {
        const currentUser =  await User.findById(req.user.id);
        const newReview = new Review({
            body: req.body.body, 
            movie: req.params.movieId,
            username: currentUser.username,
        });
        try {
            const reviewAdd = await newReview.save();
            res.status(201).json(reviewAdd);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("please login to add reviews.")
    }
})

// update
router.put("/:id", verify, async (req, res) => {
    if (req.user.id) {
        const currentUser =  await User.findById(req.user.id);
        const currentReview = await Review.findById(req.params.id);
        if (currentReview.username === currentUser.username) {
            try {
                const updatedReview = await Review.findByIdAndUpdate(req.params.id,
                    {$set: req.body}, {new: true}
                );
                res.status(201).json(updatedReview);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can only update your own comment.");
        }
    } else {
        res.status(401).json("please login to update review.")
    }
})

// delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id) {
        const currentUser =  await User.findById(req.user.id);
        const currentReview = await Review.findById(req.params.id);
        if (currentReview.username === currentUser.username) {
            try {
                await Review.findByIdAndDelete(req.params.id);
                res.status(201).json("review deleted.");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("you can only update your own comment.");
        }
    } else {
        res.status(401).json("please login to delete review.")
    }
})

// get all reviews of specific movie
router.get("/:movieId", verify, async (req, res) => {
    try {
        const reviews = await Review.aggregate([
            { $match: { movie: req.params.movieId } },
          ]);
        res.status(201).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router