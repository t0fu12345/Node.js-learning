const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
    const existing = await User.findOne({ username });
    if (existing) {
        throw new Error('Tên đăng nhập đã tồn tại');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    return user;
};

const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Sai tên đăng nhập hoặc mật khẩu');
    }
    const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    return token;
};

module.exports = { registerUser, loginUser };
