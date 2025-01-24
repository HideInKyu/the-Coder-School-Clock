const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5032;

app.use(cookieParser());
// Import the auth route
const authRoute = require("./routes/auth");
// Import the coaches route
const coachesRoute = require("./routes/coaches");

app.get("/", (req, res) => {
  res.send("theCoderSchool Clock");
});

app.use("/auth", authRoute);
app.get("/callback", (req, res) => {
  authRoute.handle(req, res);
});

app.use("/coaches", coachesRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
