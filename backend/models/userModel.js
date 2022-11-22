const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('Please fill in every field.');
    }
    const userExists = await this.findOne({ username })
    if (!userExists) {
        throw Error('User not found.');
    }
    const compare = await bcrypt.compare(password, userExists.password)
    if (!compare) {
        throw Error('Invalid login credentials.');
    }
    return userExists;
}

userSchema.statics.signup = async function(username, password) {
    if (!username || !password) {
        throw Error('Please fill in every field.');
    }
    if (/^[\w-]{4,20}$/.test(username) == false) {
        throw Error('Invalid username. Username has to be 4-20 characters long. Can only contain letters, numbers, underscores, and hyphens.');
    }
    const duplicate = await this.findOne({ username });
    if (duplicate) {
        throw Error('Username already in use.');
    }
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password) == false) {
        throw Error('Password is not strong enough. Must be minimum 8 characters long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ username, password: hashedPassword });
    return user;
}

module.exports = mongoose.model('User', userSchema)