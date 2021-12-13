const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '이름을 입력해주세요.'],
        maxlength: 20,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, '이메일을 입력해주세요.'],
        trim:true,
        validate: {
            validator: validator.isEmail,
            message: '이메일 형식이 유효하지 않습니다.'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, '비밀번호를 입력해주세요.'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
            '비밀번호는 최소 8자리 이어야 하며, 최소 하나의 대문자, 소문자, 숫자, 특수 기호를 포함해야합니다.'
        ]

    },
    role: {
        type: String,
        enum: ['devADMIN', 'user'],
        default: 'user'
    }
})

UserSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.comparePassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password)
}

module.exports = mongoose.model('User', UserSchema);