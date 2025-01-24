const fs = require("fs");

const saveTokenToEnv = (accessToken) => {
  const envFilePath = ".env";
  const envContent = `ACCESS_TOKEN=${accessToken}\n`;
  if (fs.existsSync(envFilePath)) {
    const data = fs.readFileSync(envFilePath, "utf8");
    if (data.includes("ACCESS_TOKEN")) {
      const newContent = data.replace(/ACCESS_TOKEN=.*/g, envContent);
      fs.writeFileSync(envFilePath, newContent, "utf8");
      console.log("Token updated in .env file.");
      accessToken = process.env.ACCESS_TOKEN;
      return;
    }
  }
  fs.appendFileSync(envFilePath, envContent, "utf8");
  console.log("Token saved to .env file.");
};

module.exports = saveTokenToEnv;
