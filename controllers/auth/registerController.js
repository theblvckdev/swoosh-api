const dbConnect = require('../../config/dbConnect');
const bcrypt = require('bcrypt');
const sendEmail = require('../../mail/userEmailVerification');
const { randomBytes } = require('crypto');

const handleNewUser = async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  if (!username || !email || !firstName || !lastName || !password)
    return res.status(400).json({ message: 'All fields are required!' });

  const sqlSelectAllQuery =
    'SELECT * FROM users WHERE username = ? OR email = ?';

  const emailToken = randomBytes(64).toString('hex');
  // const hashedEmailToken = createHash('sha256').update(emailToken).digest('hex');

  try {
    dbConnect.query(sqlSelectAllQuery, [username, email], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      // check for duplicate usernames in db
      const duplicate = data.length;
      if (duplicate) {
        return res.status(409).json({
          message: `Opps!, Account already taken`,
        });
      }

      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // save new user details in db
      const sqlInsertQuery =
        'INSERT INTO users (username, firstName, lastName, email, password, verificationToken) VALUES (?, ?, ?, ?, ?, ?)';

      dbConnect.query(
        sqlInsertQuery,
        [username, firstName, lastName, email, hashedPassword, emailToken],
        (err, data) => {
          if (err) return res.status(500).json({ message: err.message });

          // send email verification
          const verificationUrl = `${req.protocol}://${req.get(
            'host'
          )}/api/auth/verify-email/${emailToken}`;

          sendEmail({
            email,
            subject: `[Action Required:] Verify Your Swoosh Email`,
            verificationUrl,
          });

          res.status(200).json({
            status: 'Success',
            message: `We just sent a verification email to ${email}`,
            data,
          });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleNewUser;
