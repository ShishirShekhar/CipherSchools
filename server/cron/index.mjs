import cron from "../cron.mjs";

// Cron job to run every hour
const cronJob = async (req, res) => {
  cron.start();
  res.status(200).json({ message: "Cron job executed!" });
};

export default cronJob;
