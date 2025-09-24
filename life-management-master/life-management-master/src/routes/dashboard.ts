// routes/dashboard.js
import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/overview", async (req, res) => {
  try {
    // Total members
    const [members] = await db.query("SELECT COUNT(*) AS count FROM members");

    // Total locations
    const [locations] = await db.query("SELECT COUNT(*) AS count FROM locations");

    // Total admins
    const [admins] = await db.query("SELECT COUNT(*) AS count FROM admins");

    // Recent activities (last 5)
    const [activities] = await db.query(
      "SELECT message, created_at FROM activity_logs ORDER BY created_at DESC LIMIT 5"
    );

    res.json({
      stats: [
        { label: "Total Members (Global)", value: members[0].count },
        { label: "Total Locations", value: locations[0].count },
        { label: "Admins Created", value: admins[0].count }
      ],
      activities
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
