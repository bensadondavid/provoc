

const protected = async (req, res) => {
  try {
    const { userId, username, userEmail } = req.user;
    res.status(200).json({
      message: 'User authenticated',
      userId,
      username,
      userEmail
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = protected;