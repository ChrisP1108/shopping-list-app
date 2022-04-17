const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const { userVerify } = require('../../middleware/userMiddleware');
const { generateToken } = require('../../middleware/tokenMiddleware');
const bcrypt = require('bcryptjs/dist/bcrypt');

// Update User Credentials

const putUserUpdate = asyncHandler(async (req, res) => {
    const { username, password, dob, firstName, email, pin, question, answer } = req.body;

    if (!username) {
        res.status(400);
        throw new Error('A Username Must Be Provided To Register User')
    }
    if(username.includes(' ') 
        || username.length > 15 || username.length < 8) {
            res.status(400);
            throw new Error('Username Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }
    if (!password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Register User')
    }
    if (password.includes(' ') 
        || password.length > 15 || password.length < 8) {
            res.status(400);
            throw new Error('Password Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }
    if (!email) {
        res.status(400);
        throw new Error('A User Email Must Be Provided')
    }
    if (email.includes(' ') || !email.includes('@') || email.length < 8) {
            res.status(400);
            throw new Error('Email Cannot Have Spaces Or Be Less Than 8 And Must Have @')
    }
    if (!dob) {
        res.status(400);
        throw new Error('A User Date Of Birth Must Be Provided To Register User')
    }
    if (!firstName) {
        res.status(400);
        throw new Error('A User First Name Must Be Provided To Register User')
    }
    if (firstName.includes(' ')) {
        res.status(400);
        throw new Error('A User First Name Cannot Have Spaces')
    }
    if (!pin) {
        res.status(400);
        throw new Error('A User Last Name Must Be Provided To Register User')
    }
    if (pin.length > 4 || pin.length < 4) {
        res.status(400);
        throw new Error('A User Last Name Must Be Provided To Register User')
    }
    pin = pin.toString();
    if (!question) {
        res.status(400);
        throw new Error('A Unique User Recover Security Question Must Be Provided')
    }
    if (question.length > 50 || question.length < 8) {
        res.status(400);
        throw new Error('User Recovery Question Cannot Be Less Than 8 Or Greater Than 50 Characters')
    }
    if (!answer) {
        res.status(400);
        throw new Error('A Unique User Recover Security Answer Must Be Provided')
    }
    
    if (answer.includes(' ') || answer.length > 15 || answer.length < 8) {
        res.status(400);
        throw new Error('User Recovery Answer Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
        res.status(400);
        throw new Error('User Not Found')
    }

    user.user = user._id

    if (!userVerify(req.user, user)) {
        res.status(401);
        throw new Error('User Not Authorized')
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password.toLowerCase(), salt);
    const hashedPin = await bcrypt.hash(pin, salt);
    const hashedAnswer = await bcrypt.hash(answer.toLowerCase(), salt);
    
    const updatedUser = {
        username: username.toLowerCase(),
        password: hashedPassword,
        firstName: firstName[0].toUpperCase() + firstName.slice(1).toLowerCase(),
        email: email.toLowerCase(),
        recovery: {
            dob: dob.toString().toLowerCase(),
            pin: hashedPin,
            question,
            answer: hashedAnswer
        }
    }

    const userUpdate = await User
        .findByIdAndUpdate(req.params.id, updatedUser, {new: true});
    
    if (userUpdate) {
        res.status(200).json({
            _id: userUpdate.id,
            username: userUpdate.username,
            firstName: userUpdate.firstName,
            email: userUpdate.email,
            token: generateToken(userCreate._id)
        });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Updating User Credentials')
    }
});

// Finish Recovery Of Login Credentials From Provided User ID And Question

const putUserRecoveryComplete = asyncHandler(async (req, res) => {
    let { password, dob, pin, firstName, email, question, answer } = req.body;

    if (!dob) {
        res.status(400);
        throw new Error('A User Date Of Birth Must Be Provided To Recover Login Credentials')
    }
    if (!firstName) {
        res.status(400);
        throw new Error('A User First Name Must Be Provided To Recover Login Credentials')
    }
    if (!email) {
        res.status(400);
        throw new Error('A User Email Must Be Provided To Recover User Credentials')
    }
    if (!pin) {
        res.status(400);
        throw new Error('A User 4 Digit Pin Must Be Provided To Recover Login Credentials')
    }
    pin = pin.toString();
    if (!question) {
        res.status(400);
        throw new Error('User Question Must Be Provided To Recover Answer')
    }
    if (!answer) {
        res.status(400);
        throw new Error('User Answer To Security Question Must Be Provided To Recover Login Credentials')
    }
    if (!password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Update User Login Credentials')
    }
    if (password.includes(' ') 
        || password.length > 15 || password.length < 8) {
            res.status(400);
            throw new Error('Password Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }

    const user = await User.findById(req.params.id);
    
    if (!user) {
        res.status(400);
        throw new Error('User Not Found')
    }

    if (user.email !== email.toLowerCase() || user.recovery.dob !== dob.toString().toLowerCase()
        || user.firstName.toLowerCase() !== firstName.toLowerCase()
        || user.recovery.question.toLowerCase() !== question.toLowerCase()) {
            res.status(401);
            throw new Error('Invalid User Credentials Provided');
    }

    if (!await bcrypt.compare(pin.toString(), user.recovery.pin)) {
        res.status(401);
        throw new Error('Invalid User Credentials Provided')
    }

    if (!await bcrypt.compare(answer.toLowerCase(), user.recovery.answer)) {
        res.status(401);
        throw new Error('Invalid User Credentials Provided')
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password.toLowerCase(), salt);

    const updatedUser = {
        username: user.username,
        password: hashedPassword,
        firstName: user.firstName,
        email: user.email,
        recovery: {
            dob: user.recovery.dob,
            pin: user.recovery.pin,
            question: user.recovery.question,
            answer: user.recovery.answer
        }
    }

    const userUpdate = await User
        .findByIdAndUpdate(req.params.id, updatedUser, {new: true});
    
    if (userUpdate) {
        res.status(200).json({
            _id: userUpdate.id,
            username: user.username,
            firstName: user.firstName,
            email: user.email,
            token: generateToken(userUpdate.id)
        });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Updating User Credentials')
    }
});

module.exports = { putUserUpdate, putUserRecoveryComplete }