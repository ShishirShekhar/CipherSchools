import cron from "../cron.mjs";

// Cron job to run every hour
export default async function handler(req, res) {
  try {
    cron.start();
    res.status(200).json({ message: "Cron job executed!" });
  } catch (error) {
    console.error("Cron job failed:", error);
    res.status(500).json({ message: "Cron job failed!" });
  }
}
