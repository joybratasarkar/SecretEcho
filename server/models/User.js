const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    console.log('Generating salt...');
    const salt = await bcrypt.genSalt(10);
    console.log('Salt generated');
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed');
    next();
  } catch (err) {
    console.error('Error hashing password:', err);
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
