const User = require('../Models/UserModel');

const getPreferences = async (req ,res , next)=>{
  try {
    res.status(200).json({
      preferences: req.user.preferences,
    });
  } catch (err) {
    next(err);
  }
}
const updatePreferences = async (req, res, next) => {
  try {
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { preferences } },
      { new: true, runValidators: true }
    ).select('-password');
 
    res.status(200).json({
      message: 'Preferences updated successfully',
      preferences: user.preferences,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getPreferences,
    updatePreferences,
}