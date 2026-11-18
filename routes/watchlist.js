import express from "express";
import { getWatchlist, findById, addMovie, updateMovie, deleteMovie } from "../utils/db.js"
import { authorizeModification } from "../middleware/authorize.js"
const router = express.Router()

router.get("/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    const watchlist = getWatchlist(userId)
    if (!watchlist) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(watchlist)
})

router.post("/:userId/movies", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId)

    const { title, genre } = req.body
    if (!title || !genre) {
        return res.status(400).json({ error: "Title and genre are required" });
    }
    const newMovie = addMovie(userId, { title, genre })
    return res.status(201).json(newMovie)
})


router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId)
    const movieId = Number(req.params.movieId)

    const updatedMovie = updateMovie(userId, movieId, req.body);
    if (!updatedMovie) {
        return res.status(404).json({ error: "User or movie not found" });
    }

    return res.status(200).json(updatedMovie);
})

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const userId = Number(req.params.userId)
    const movieId = Number(req.params.movieId)

    const deletedMovie = deleteMovie(userId, movieId)
    return res.status(200).json({ message: "Movie removed from watchlist" })
})

export default router