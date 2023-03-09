const { Schema, model, Types} = require("mongoose");


const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
        email: {
        type: String,
        required: "Email address is required",
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
        ],
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'thought',
        },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'user',
        },
    ],
    },
    {
    toJSON: {
        virtuals: true,
    },
    id: false,
    }
);

userSchema.virtual("friendsCount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;