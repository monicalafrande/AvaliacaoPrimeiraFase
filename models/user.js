// Criei o arquivo user.js no diretório models, para armazenar o schema do usuário.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) next(err);
            else {
                this.password = hashedPassword;
                next();
            }
        });
    }
});

userSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) callback(err);
        else callback(null, same);
    });
};

module.exports = mongoose.model('user', userSchema);