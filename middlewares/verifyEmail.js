const { createHash } = require('crypto');

const verifyEmail = async (req, res, next) => {
  try {
    // check if email has been tampered with
    const hashedEmailToken = createHash('sha256')
      .update(req.params.verificationToken)
      .digest('hex');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
