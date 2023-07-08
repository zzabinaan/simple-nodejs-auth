import jwt from "jsonwebtoken";
import { responseFailed } from "../controller/response.js";
import Users from "../models/UserModel.js";

export const verifyToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return responseFailed(401, "Anda belum login", res);

  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return responseFailed(401, "Anda belum login", res);

  const authHeader = req.headers[`authorization`];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return responseFailed(401, "Unauthorized", res);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return responseFailed(403, "anda tidak memiliki akses untuk ini", res);
    req.email = decoded.email;
    next();
  });
};
