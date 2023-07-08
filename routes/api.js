import express from "express";
import { refreshToken } from "../controller/RefreshToken.js";
import { getUsers, Register, Login, Logout } from "../controller/Users.js";
import Movies from "../models/MovieModel.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  getMovieById,
  getMovies,
  updateMovie,
  createMovie,
  deleteMovie,
} from "../controller/Movies.js";

const router = express.Router();

router.get(`/users`, verifyToken, getUsers);
router.post(`/register`, Register);
router.post(`/login`, Login);
router.get(`/refreshToken`, refreshToken);
router.delete(`/logout`, Logout);

// admin
router.post(`/movies`, verifyToken, createMovie);
router.patch(`/movies/:id`, updateMovie);
router.delete(`/movies/:id`, deleteMovie);
// public
router.get(`/movies`, getMovies);
router.get(`/movies/:id`, getMovieById);

export default router;
