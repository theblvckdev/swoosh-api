const { createHash } = require('crypto');
const dbConnect = require('../../config/dbConnect');

const verifyEmail = (req, res) => {
  const { token } = req.params;

  const sqlSelectQuery =
    'SELECT status, verificationToken FROM users WHERE verificationToken = ?';
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

    const verificationToken = data[0].verificationToken;
    if (verificationToken !== token) {
      return res.status(409).json({ message: 'Invalid verification token' });
    }

    const status = data[0].status;
    if (status !== 0)
      return res.status(200).json({ message: 'Email already verified' });

    const updateSqlQuery =
      'UPDATE users SET status = ? WHERE verificationToken = ?';
    dbConnect.query(updateSqlQuery, [1, token], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      res.status(200).json({ message: 'Email verified successfully' });
    });
  });
};

module.exports = verifyEmail;
