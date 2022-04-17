const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const { userVerify } = require('../../middleware/userMiddleware');
const { generateToken } = require('../../middleware/tokenMiddleware');
const bcrypt = require('bcryptjs/dist/bcrypt');

// Update User Credentials

const putUserUpdate = asyncHandler(async (req, res) => {
    const { username, password, dob, firstName, pin, question, answer } = req.body;

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
    const hashedPin = await bcrypt.hash(Number(pin), salt);
    const hashedDob = await bcrypt.hash(dob.toLowerCase(), salt);
    const hashedAnswer = await bcrypt.hash(answer.toLowerCase(), salt);
    
    const updatedUser = {
        username: username.toLowerCase(),
        password: hashedPassword,
        firstName: firstName[0].toUpperCase() + firstName.slice(1).toLowerCase(),
        recovery: {
            dob: hashedDob,
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
            token: generateToken(userCreate._id)
        });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Updating User Credentials')
    }
});

// Finish Recovery Of Login Credentials From Provided User ID And Question

const putUserRecoveryComplete = asyncHandler(async (req, res) => {
    let { password, dob, firstName, pin, question, answer } = req.body;

    if (!dob) {
        res.status(400);
        throw new Error('A User Date Of Birth Must Be Provided To Recover Login Credentials')
    }
    if (!firstName) {
        res.status(400);
        throw new Error('A User First Name Must Be Provided To Recover Login Credentials')
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
        throw new Error('User Answer To Security Question Must Be Provided To Recover Answer')
    }
    if (answer.includes(' ') || answer.length > 15 || answer.length < 8) {
        res.status(400);
        throw new Error('User Recovery Answer Cannot Have Spaces Or Be Less Than 8 Or Greater Than 15 Characters')
    }
    if (!password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Update User Credentials')
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

    if (!await bcrypt.compare(answer, user.recovery.answer)) {
        res.status(401);
        throw new Error('Answer To Security Question Is Incorrect')
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password.toLowerCase(), salt);
    const hashedPin = await bcrypt.hash(pin, salt)

    const updatedUser = {
        username: user.username,
        password: hashedPassword,
        firstName: user.firstName,
        recovery: {
            dob: user.recovery.dob,
            pin: hashedPin,
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
            token: generateToken(userUpdate.id)
        });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Updating User Credentials')
    }
});

module.exports = { putUserUpdate, putUserRecoveryComplete }