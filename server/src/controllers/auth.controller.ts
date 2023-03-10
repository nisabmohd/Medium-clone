import asyncHandler from "express-async-handler";
import axios from "axios";
import User from "../models/user";
import jwt from "jsonwebtoken";
import qs from "qs";
import env from "../utils/envalid";
import Token from "../models/token";

export const emailLogin = asyncHandler((req, res, next) => {});

export const logout = asyncHandler((req, res, next) => {});

export const googleAuth = asyncHandler(async (req, res, next) => {
  // console.log(req);
  const { id_token, access_token } = await getUserFromCode(
    req.query.code as string
  );
  const user = await userDetails(access_token, id_token);
  let isUser: any = await User.findOne({ email: user.email });
  if (!isUser) {
    const temp = new User({
      name: user.name,
      email: user.email,
      avatar: user.picture,
    });
    isUser = await temp.save();
  }
  const access_token_server = jwt.sign({ _id: isUser._id }, env.JWT_SECRET, {
    expiresIn: "30m",
  });
  const refresh_token_server = jwt.sign(
    { _id: isUser._id },
    env.JWT_REFRESH_SECRET
  );
  const refToken = new Token({
    token: refresh_token_server,
  });
  await refToken.save();
  res.redirect(
    `${env.CLIENT_URL}/oauth/redirect?uid=${isUser._id}&access_token=${access_token_server}&refresh_token=${refresh_token_server}`
  );
});

async function getUserFromCode(code: string) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: env.clientid,
    client_secret: env.clientsecret,
    redirect_uri: env.redirect_url,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    // throw new Error(error);
  }
}

async function userDetails(access_token: string, id_token: string) {
  return axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
}
