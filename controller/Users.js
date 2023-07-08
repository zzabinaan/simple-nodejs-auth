import Users from "../models/UserModel.js";
import { responseSuccess, responseFailed } from "./response.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

// get all users
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    responseSuccess(200, "Success", users, res);
  } catch (error) {
    console.log(error);
  }
};

// post users (register)
export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await Users.findAll({
    where: {
      email: req.body.email,
    },
  });
  if (user[0]) return responseFailed(409, "email telah digunakan", res);

  if (password !== confirmPassword)
    return responseFailed(400, "Password dan Confirm Password tidak sama", res);

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    const data = {
      name,
      email,
    };
    return responseSuccess(200, "Akun berhasil dibuat", data, res);
  } catch (error) {
    console.log(error);
  }
};

// login
export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return responseFailed(400, "Password salah", res);
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const data = {
      userId,
      name,
      email,
      accessToken,
    };

    responseSuccess(200, "Login Berhasil", data, res);
  } catch (error) {
    responseFailed(404, "Email salah", res);
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return responseFailed(
      401,
      "Anda tidak memiliki akses untuk melakukan ini",
      res
    );

  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.status(204);
  const userId = user[0].id;
  const email = user[0].email;
  const name = user[0].name;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  const data = {
    userId,
    email,
    name,
  };
  res.clearCookie("refreshToken");
  return responseSuccess(200, "Logout Berhasil", data, res);
};
