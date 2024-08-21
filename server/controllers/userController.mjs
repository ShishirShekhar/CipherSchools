// Define the user controller object
const userController = {
  // Get a user
  getUser: async (req, res) => {
    try {
      // Get the user ID from the access token
      const user = req.user;
      return res.status(200).json({
        data: { ...user },
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ data: null, error: "Internal Server Error" });
    }
  },
};

// Export the user controller
export default userController;
