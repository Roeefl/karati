const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const ownedBookSchema = require('./OwnedBook');
const wishSchema = require('./Wish');
const swipeSchema = require('./Swipe');
const notificationSchema = require('./Notification');

const portraits = require('../config/portraits');

const userSchema = new Schema (
    {
        oauthID: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        fullName: {
            first: {
                type: String,   
                required: false
            },
            last: {
                type: String,
                required: false
            }
        },
        bio: {
            type: String,
            required: false
        },
        portrait: {
            type: String,
            required: false,
            default: portraits.ELYSE
        },
        email: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: false
        },
        lastLogin: {
            type: Date,
            required: false
        },
        ownedBooks: {
            type: [ownedBookSchema],
            required: false
        },
        wishlist: {
            type: [wishSchema],
            required: false,
            default: []
        },
        swipes: {
            type: [swipeSchema],
            required: false
        },
        notifications: {
            type: [notificationSchema],
            required: false
        },
        passedIntro: {
            type: Boolean,
            required: true,
            default: false
        },
        settings: {
            type: Object,
            required: false
        },
        location: {
            lat: {
                type: Number,
                required: false,
                default: 32.82206
            },
            lng: {
                type: Number,
                required: false,
                default: 35.00032
            }
        }
    }
);

userSchema.statics.fetchRandom = async function (cb) {
    const userCount = await this.count();
    const rndSkip = Math.floor(Math.random() * userCount);
    return this.findOne().skip(rndSkip).exec(cb);
};

mongoose.model('users', userSchema);
