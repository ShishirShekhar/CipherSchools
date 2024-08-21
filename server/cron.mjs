import cronJob from "./cron/index.mjs";

// Cron job to run every hour
export default cron.schedule("0 * * * *", cronJob);
