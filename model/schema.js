const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/weCare", {
    useNewUrlParser: true
}).then(() => console.log("WeCare's DB is ready to use"));

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Required Field"]
    },
    name: {
        type: String,
        required: [true, "Required Field"]
    },
    password: {
        type: String,
        required: [true, "Required Field"]
    },
    gender: {
        type: String,
        required: [true, "Required Field"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Required Field"]
    },
    email: {
        type: String,
        required: [true, "Required Field"]
    },
    mobileNumber: {
        type: String,
        required: [true, "Required Field"]
    },
    pincode: {
        type: String,
        required: [true, "Required Field"]
    },
    city: {
        type: String,
        required: [true, "Required Field"]
    },
    state: {
        type: String,
        required: [true, "Required Field"]
    },
    country: {
        type: String,
        required: [true, "Required Field"]
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

const coachSchema = new mongoose.Schema({
    coachId: {
        type: String
    },
    name: {
        type: String,
        required: [true, "Required Field"]
    },
    password: {
        type: String,
        required: [true, "Required Field"]
    },
    gender: {
        type: String,
        required: [true, "Required Field"]
    },
    dateOfBirth: {
        type: String,
        required: [true, "Required Field"]
    },
    mobileNumber: {
        type: String,
        required: [true, "Required Field"]
    },
    speciality: {
        type: String,
        required: [true, "Required Field"]
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

const bookingSchema = new mongoose.Schema({    
    bookingId: {
        type: String
    },
    userId: {
        type: String
    },
    coachId: {
        type: String
    },
    appointmentDate: {
        type: Date
    },
    slot: {
        type: String
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

exports.usersModel = new mongoose.model('users', userSchema);

exports.coachesModel = new mongoose.model('coaches', coachSchema);

exports.bookingsModel = new mongoose.model('bookings', bookingSchema);
