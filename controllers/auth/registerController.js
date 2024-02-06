const dbConnect = require('../../config/dbConnect');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  if (!username || !email || !firstName || !lastName || !password)
    return res.status(400).json({ message: 'All fields are required!' });

  const sqlSelectAllQuery = 'SELECT * FROM users WHERE username = ?';

  try {
    dbConnect.query(sqlSelectAllQuery, [username], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      // check for duplicate usernames in db
      const duplicate = data.length;
      if (duplicate) {
        return res
          .status(409)
          .json({ message: `Username ${username} already in taken` });
      }

      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // save new user details in db
      const sqlInsertQuery =
        'INSERT INTO users (username, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)';

      dbConnect.query(
        sqlInsertQuery,
        [username, firstName, lastName, email, hashedPassword],
        (err, data) => {
          if (err) return res.status(500).json({ message: err.message });

          res
            .status(200)
            .json({ message: `New user ${username} created!`, data });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
