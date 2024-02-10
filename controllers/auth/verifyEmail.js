const { createHash } = require('crypto');
const dbConnect = require('../../config/dbConnect');

const verifyEmail = (req, res) => {
  const { token } = req.params;

  const sqlSelectQuery = 'SELECT status FROM users WHERE verificationToken = ?';
  dbConnect.query(sqlSelectQuery, [token], (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    const foundUserWIthToken = data.length;
    if (!foundUserWIthToken) {
      return res.status(409).json({
        message: `No user with verification token: ${token} was found`,
      });
    }

    const updateSqlQuery =
      'UPDATE users SET status = ? WHERE verificationToken = ?';
    dbConnect.query(updateSqlQuery, [1, token], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      res.status(200).json({ message: 'Email verified successfully' });
    });
  });
};

module.exports = verifyEmail;
