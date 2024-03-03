import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Commented to DB");
const handleError = (error) => console.log("db Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
