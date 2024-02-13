const dbConnect = require('../../config/dbConnect');

const updateUserDetails = async (req, res) => {
  const userId = req.params.userId;
  const { username, firstName, lastName } = req.body;

  const sqlUpdateQuery =
    'SELECT username, firstName, lastName FROM users WHERE userId = ?';

  try {
    dbConnect.query(sqlUpdateQuery, [userId], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      if (!data.length)
        return res
          .status(404)
          .json({ message: `User with user ID: ${userId} not found` });

      // update user details
      const sqlUpdateQuery =
        'UPDATE users SET username = ?, firstName = ?, lastName = ? WHERE userId = ?';

      dbConnect.query(
        sqlUpdateQuery,
        [username, firstName, lastName, userId],
        (err, data) => {
          if (err) return res.status(500).json({ message: err.message });

          res
            .status(200)
            .json({ message: 'User details updated successfully', data });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = updateUserDetails;
