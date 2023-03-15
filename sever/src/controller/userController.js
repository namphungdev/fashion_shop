const User = require('../model/user');
const bcrypt = require('bcryptjs');
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.getAllUser = async (req, res) => {
    const allUser = await User.find();
    res.json(allUser);
}
exports.createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
}
exports.getUser= async (req, res) => {
 try {
    // console.log('token', req.body.token);#
    const user_id = jwt.verify(req.body.token, process.env.JWT_SECRET)._id;
    const userInfor = await User.findById(user_id).lean();
    delete userInfor.password;
    console.log(userInfor);
    console.log(user_id);
    res.json(userInfor);
    } catch (err) {
        return res.json({ error: 'Tài khoản không tồn tại' });
    }
}

exports.postLogout = async (req, res) => {
    // req.session.isAuth = false;6
    const user_id = jwt.verify(req.body.token, process.env.JWT_SECRET)._id;
    res.clearCookie('userid1');
    res.json({ status: 'success' });
}
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    
    if (!user) {
        return res.json({ error: 'Tài khoản không tồn tại' });
    }

    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
        return res.json({ error: 'Sai mật khẩu' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1D' });
    // console.log("day la token",token);
    res.json({token:token, status:'success'});
    
}

exports.postRegister = async (req, res) => {
    const { name, email, password: hashpassword, phone, address } = req.body;
    const password = await bcrypt.hash(hashpassword, 10);
    try {
        const checkemail = await User.findOne({ email:email });
        if (checkemail) {
            res.json({ error: 'Email đã tồn tại' });
        }
        else 
        {
            const newUser = await User.create
            ({
                name,
                email,
                password,
                phone,
                address
            }); 
            // console.log(newUser);
            res.json(newUser);
        }
    } catch (err) {
        return res.json({ error: 'Đăng ký thất bại' });
    }
}
exports.postForgotPassword = async (req, res) => {
    UserController.postForgotPassword(req, res);
    UserController.UserController.postForgotPassword(req, res);

}
exports.postResetPassword = async (req, res) => {
    UserController.postResetPassword(req, res);
}





