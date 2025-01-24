const express = require("express");
const axios = require("axios");
const { access } = require("fs");
const router = express.Router();

// Route to fetch all coaches
router.get("/", async (req, res) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).send("Unauthorized: No access token found.");
  }

  try {
    const url = "https://tcs-torrance.pike13.com/api/v2/desk/people";
    console.log("Request URL:", url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      params: {
        per_page: 100, // Adjust based on pagination needs
      },
    });


    res.json(simplifiedCoaches);
  } catch (error) {
    console.error(
      "Error fetching coaches:",
      error.response?.data || error.message,
    );
    res.status(500).send("Failed to fetch coaches.");
  }
});

module.exports = router;
