const express = require("express");
const axios = require("axios");
const router = express.Router();

const saveTokenToEnv = require("../controllers/saveTokenToEnv");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const AUTHURL = `https://pike13.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
let ACCESS_TOKEN;

router.get("/", (req, res) => {
  res.redirect(AUTHURL);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Auth code not found");
  }

  try {
    const tokenRes = await axios.post("https://pike13.com/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
    });

    const accessToken = tokenRes.data.access_token;
    console.log("Access token:", accessToken);

    saveTokenToEnv(accessToken);

    res.cookie("access_token", accessToken, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 3600000, // 1 hour expiry
    });

    res.send("Access token fetched successfully.");
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message,
    );
    res.status(500).send("Failed to fetch access token.");
  }
});

module.exports = router;
