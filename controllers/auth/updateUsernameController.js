const dbConnect = require('../../config/dbConnect');

const updateUsername = async (req, res) => {
  const userId = req.params;
  const { username, email, password } = req.body;

  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = updateUsername;
