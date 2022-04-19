const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const { generateToken } = require('../../middleware/tokenMiddleware');

// Register New User

const postUserRegister = asyncHandler(async (req, res) => {
    let { username, password, email, dob, firstName, pin, question, answer } = req.body;

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
        throw new Error('A User 4 Digit Pin Must Be Provided To Register User')
    }
    pin = pin.toString();
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
    const userExists = await User.findOne({username})
    if (userExists) {
        res.status(400);
        throw new Error('A User With The Same Username Already Exists.  Please Register A Different Username')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toLowerCase(), salt);
    const hashedPin = await bcrypt.hash(pin, salt);
    const hashedAnswer = await bcrypt.hash(answer.toLowerCase(), salt);

    const userCreate = await User.create({
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
    });

    if (userCreate) {
        res.status(201).json({
            _id: userCreate.id,
            username: userCreate.username,
            firstName: userCreate.firstName,
            email: userCreate.email,
            token: generateToken(userCreate._id)
        });
    } else {
        res.status(500);
        throw new Error('An Error Occured When Registering User')
    }
});

// User Login

const postUserLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(400);
        throw new Error('A Username Must Be Provided To Login')
    }
    if (!password) {
        res.status(400);
        throw new Error('A Password Must Be Provided To Login')
    }
    const user = await User.findOne({ username });

    if (!user) {
        res.status(400);
        throw new Error('User Not Found')
    }

    if (!await bcrypt.compare(password, user.password)) {
        res.status(400);
        throw new Error('Invalid Password')
    }
    res.status(200).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
    });
});

// User Login Credentials Recovery Initialization

const postUserRecoveryInit = asyncHandler(async (req, res) => {
    let { firstName, email, dob, pin } = req.body;

    if (!dob) {
        res.status(400);
        throw new Error('A User Date Of Birth Must Be Provided To Recover User Credentials')
    }
    if (!firstName) {
        res.status(400);
        throw new Error('A User First Name Must Be Provided To Recover User Credentials')
    }
    if (!email) {
        res.status(400);
        throw new Error('A User Email Must Be Provided To Recover User Credentials')
    }
    if (!pin) {
        res.status(400);
        throw new Error('A User 4 Digit Pin Must Be Provided')
    }

    pin = pin.toString();
    
    const userSearch = await User.find( 
        { firstName: firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() },
        { recovery: {
            dob: dob
            }
        },
        { email: email}
    );

    if (!userSearch || !userSearch.length) {
        res.status(400);
        throw new Error('User Not Found')
    }

    const user = await User.findById(userSearch[0]._id)

    if (user.email !== email.toLowerCase() || user.recovery.dob !== dob.toString().toLowerCase()
        || user.firstName.toLowerCase() !== firstName.toLowerCase()) {
            res.status(401);
            throw new Error('Invalid User Credentials Provided');
    }
    if (!await bcrypt.compare(pin, user.recovery.pin)) {
        res.status(401);
        throw new Error('Invalid User Credentials Provided');
    }
    const userUpdate = await User
        .findByIdAndUpdate(user._id, user, {new: true});
    if (userUpdate) {
        userUpdate.password = "Protected";
        userUpdate.recovery.dob = "Protected";
        userUpdate.recovery.pin = "Protected";
        userUpdate.recovery.answer = "Protected";
        res.status(200).json(userUpdate);
    } else {
        res.status(500);
        throw new Error('An Error Occured When Updating User Credentials')
    }
});

module.exports = {
    postUserRegister,
    postUserLogin,
    postUserRecoveryInit
}