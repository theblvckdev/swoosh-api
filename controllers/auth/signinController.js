const dbConnect = require('../../config/dbConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { username, email, password } = req.body;

  const sqlSelectAllQuery =
    'SELECT * FROM users WHERE username = ? OR email = ?';

  try {
    dbConnect.query(sqlSelectAllQuery, [username, email], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      // check if user with username exists
      const foundAccount = data.length;
      if (!foundAccount) {
        return res
          .status(404)
          .json({ message: `Account with username ${username} not found` });
      }

      if (data[0].status === 0) {
        return res
          .status(401)
          .json({
            message:
              'Account not verified, check your email and verify your account!',
          });
      }

      const user = data[0];

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500).json({ message: err.message });

        if (!match) {
          return res
            .status(401)
            .json({ message: 'Invalid email address or password' });
        }

        // create JWTs
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleLogin;
