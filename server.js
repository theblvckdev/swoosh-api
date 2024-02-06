const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const corsOPtions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvent");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOPtions));

// custom middlewares
app.use(logger);
app.use(errorHandler);

// routes
app.use("/api/auth/", require("./routes/auth/registerRoute"));

// sends a JSON object with an error message if api route not fond
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
