const dbConnect = require('../../config/dbConnect');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'All fields are required!' });

  const sqlSelectAllQuery = 'SELECT * FROM users WHERE username = ?';

  try {
    dbConnect.query(sqlSelectAllQuery, [username], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      // check if user with username exists
      if (!data.length) {
        return res
          .status(404)
          .json({ message: `Account with username ${username} not found` });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
