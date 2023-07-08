import Movies from "../models/MovieModel.js";
import Users from "../models/UserModel.js";
import { responseSuccess, responseFailed } from "./response.js";

export const createMovie = async (req, res) => {
  const { name, release_date, duration } = req.body;
  try {
    await Movies.create({
      name: name,
      release_date: release_date,
      duration: duration,
    });

    const data = {
      name,
      release_date,
      duration,
    };
    return responseSuccess(200, "Movie Successfully Posted", data, res);
  } catch (error) {
    console.log(error);
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movies.findAll();
    responseSuccess(200, "Success", movies, res);
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movies = await Movies.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!movies) return responseFailed(404, "Movies Are Not Found", res);
    responseSuccess(200, "Success", movies, res);
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, release_date, duration } = req.body;

    // await Movies.update(req.body, {
    //     where: {
    //       id: req.params.id,
    //     },
    //   });

    await Movies.update(
      {
        name: name,
        release_date: release_date,
        duration: duration,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const data = {
      id,
      name,
      release_date,
      duration,
    };
    return responseSuccess(200, "Berhasil Diubah", data, res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movies.destroy({
      where: {
        id: req.params.id,
      },
    });

    return responseSuccess(200, "Succsess", "Movie deleted", res);
  } catch (error) {
    console.log(error);
  }
};
