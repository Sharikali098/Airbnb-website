const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("initData:", initData); // Add this line to check initData object
    if (initData && initData.data && Array.isArray(initData.data)) {
      console.log("initData.data:", initData.data); // Add this line to check initData.data array
      initData.data = initData.data.map((obj) => ({ ...obj, owner: "65c3d3cc31b4d0e837724791" }));
      await Listing.insertMany(initData.data);
      console.log("Data was initialized");
    } else {
      console.error("initData.data is not defined or is not an array.");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();

