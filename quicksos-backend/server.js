import express from "express";
import { db } from "./firebase/firebaseAdmin.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("QuickSOS backend is running");
});

app.post("/emergency", async (req, res) => {
  try {
    const { userId, location } = req.body;

    const userIdNew = userId.replace(/[^a-zA-Z0-9]/g, "");

    const userRef = db.collection("users").doc(userIdNew);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const docRef = await userRef.collection("emergencies").add({
      location,
      timestamp: new Date(),
      status: "alert dispatched",
    });

    console.log("🚨 SOS saved with ID:", docRef.id);

    res.json({
      message: `Emergency received from user ${userId} at ${location}`,
      status: "alert dispatched",
      id: docRef.id,
    });
  } catch (e) {
    console.error("Error saving SOS:", e);
    res.status(500).json({ message: "Failed to save SOS" });
  }
});

app.listen(PORT, () => {
  console.log(`QuickSOS server listening on port ${PORT}`);
});
