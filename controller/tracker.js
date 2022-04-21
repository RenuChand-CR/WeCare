const model = require('../model/schema');
const { validateName, validatePassword, validateAge, validateGender, validatePhoneNumber, validateEmail, validatePincode, validateAddress, validateSpeciality, validateSlot, validateAppointment } = require("../utilities/validator");
const { generateId } = require("../utilities/helper");

exports.registerUser = async (req, res) => {
    try {
        const { name, password, dateOfBirth, gender, mobileNumber, email, pincode, city, state, country } = req.body;

        if (!validateName(name)) {
            res.status(400).json({
                message: "Name should have minimum 3 and maximum 50 characters"
            });
        } else if (!validatePassword(password)) {
            res.status(400).json({
                message: "Password should have minimum 5 and maximum 10 characters"
            });
        } else if (!validateAge(dateOfBirth)) {
            res.status(400).json({
                message: "Age should be greater than 20 and less than 100"
            });
        } else if (!validateGender(gender)) {
            res.status(400).json({
                message: "Gender should be either M or F"
            });
        } else if (!validatePhoneNumber(mobileNumber)) {
            res.status(400).json({
                message: "Mobile Number should have 10 digits"
            });
        } else if (!validateEmail(email)) {
            res.status(400).json({
                message: "Email should be a valid one"
            });
        } else if (!validatePincode(pincode)) {
            res.status(400).json({
                message: "Pincode should have 6 digits"
            });
        } else if (!validateAddress(city)) {
            res.status(400).json({
                message: "City should have minimum 3 and maximum 20 characters"
            });
        } else if (!validateAddress(state)) {
            res.status(400).json({
                message: "State should have minimum 3 and maximum 50 characters"
            });
        } else if (!validateAddress(country)) {
            res.status(400).json({
                message: "Country should have minimum 3 and maximum 50 characters"
            });
        } else {
            const user = await model.usersModel.find({ email });
            if (user.length > 0) {
                res.status(400).json({
                    message: `User already exists with this email id ${email}`
                });
            } else {
                const userId = await generateId('user');
                await model.usersModel.create({ userId, ...req.body });
                res.status(201).json({
                    message: `User created with id ${userId}`
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { id: userId, password } = req.body;
        const user = await model.usersModel.find({ userId, password });
        if (user.length > 0) {
            res.status(200).json(true);
        } else {
            res.status(400).json({
                message: "Incorrect user Id or Password"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.registerCoach = async (req, res) => {
    const { name, password, dateOfBirth, gender, mobileNumber, speciality } = req.body;

    if (!validateName(name)) {
        res.status(400).json({
            message: "Name should have minimum 3 and maximum 50 characters"
        });
    } else if (!validatePassword(password)) {
        res.status(400).json({
            message: "Password should have minimum 5 and maximum 10 characters"
        });
    } else if (!validateAge(dateOfBirth)) {
        res.status(400).json({
            message: "Age should be greater than 20 and less than 100"
        });
    } else if (!validateGender(gender)) {
        res.status(400).json({
            message: "Gender should be either M or F"
        });
    } else if (!validatePhoneNumber(mobileNumber)) {
        res.status(400).json({
            message: "Mobile Number should have 10 digits"
        });
    } else if (!validateSpeciality(speciality)) {
        res.status(400).json({
            message: "Specilaity should have 10 to 50 characters"
        });
    } else {
        const coach = await model.coachesModel.find({ name });
        if (coach.length > 0) {
            res.status(400).json({
                message: "Coach exists with this name"
            });
        } else {
            const coachId = await generateId('coach');
            await model.coachesModel.create({ coachId, ...req.body });
            res.status(201).json({
                message: `Coach created with id ${coachId}`
            });
        }
    }
};

exports.loginCoach = async (req, res) => {
    try {
        const { id: coachId, password } = req.body;
        const user = await model.coachesModel.find({ coachId, password });
        if (user.length > 0) {
            res.status(200).json(true);
        } else {
            res.status(400).json({
                message: "Incorrect coach Id or Password"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getCoaches = async (req, res) => {
    const coaches = await model.coachesModel.find({});
    if (coaches.length > 0) {
        res.status(200).json(coaches);
    }
}

exports.getCoach = async (req, res) => {
    try {
        const { coachId } = req.params;
        const coach = await model.coachesModel.find({ coachId });
        if (coach.length > 0) {
            res.status(201).json(coach[0]);
        } else {
            res.status(400).json({
                message: "Coach Id does not exist"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await model.usersModel.find({ userId });
        if (user.length > 0) {
            res.status(201).json(user[0]);
        } else {
            res.status(400).json({
                message: "User Id does not exist"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.bookAppointment = async (req, res) => {
    try {
        const { userId, coachId } = req.params;
        const { slot, dateOfAppointment: appointmentDate } = req.body;

        const user = await model.usersModel.find({ userId });
        const coach = await model.coachesModel.find({ coachId });

        if (user.length == 0) {
            res.status(400).json({
                message: "User Id does not exist"
            });
        } else if (coach.length == 0) {
            res.status(400).json({
                message: "Coach Id does not exist"
            });
        } else if (!validateSlot(slot)) {
            res.status(400).json({
                message: "Slot should be valid [i.e., 9 AM - 8 PM] and it should be one hour"
            });
        } else if (!validateAppointment(appointmentDate)) {
            res.status(400).json({
                message: "Date should be any upcoming 7 days"
            });
        } else {
            const coachAppointmentExists = await model.bookingsModel.find({ coachId, slot, appointmentDate });
            const userAppointmentExists = await model.bookingsModel.find({ userId, slot, appointmentDate });
            if (userAppointmentExists.length > 0 || coachAppointmentExists.length > 0) {
                res.status(400).json({
                    message: "There is an appointment in this slot already"
                });
            } else {
                const bookingId = await generateId('booking');
                await model.bookingsModel.create({ bookingId, ...req.params, slot, appointmentDate });
                res.status(200).json(true);
            }
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.changeAppointment = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { slot, dateOfAppointment: appointmentDate } = req.body;

        const booking = await model.bookingsModel.find({ bookingId });

        if (booking.length == 0) {
            res.status(400).json({
                message: "Booking Id does not exist"
            });
        } else if (!validateSlot(slot)) {
            res.status(400).json({
                message: "Slot should be valid [i.e., 9 AM - 8 PM] and it should be one hour"
            });
        } else if (!validateAppointment(appointmentDate)) {
            res.status(400).json({
                message: "Date should be any upcoming 7 days"
            });
        } else {
            const userId = booking[0].userId;
            const coachId = booking[0].coachId;
            const coachAppointmentExists = await model.bookingsModel.find({ coachId, slot, appointmentDate });
            const userAppointmentExists = await model.bookingsModel.find({ userId, slot, appointmentDate });
            if (userAppointmentExists.length > 0 || coachAppointmentExists.length > 0) {
                res.status(400).json({
                    message: "There is an appointment in this slot already"
                });
            } else {
                await model.bookingsModel.updateOne({ bookingId }, { $set: { slot, appointmentDate } });
                res.status(200).json(true);
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await model.bookingsModel.find({ bookingId });

        if (booking.length == 0) {
            res.status(400).json({
                message: "Booking id is not valid. Could not delete this appointment."
            });
        } else {
            await model.bookingsModel.deleteOne({ bookingId });
            res.status(200).json(true);
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getCoachAppointments = async (req, res) => {
    try {
        const { coachId } = req.params;
        const coach = await model.coachesModel.find({ coachId });
        if (coach.length == 0) {
            res.status(400).json({
                message: "Coach Id is not valid"
            });
        } else {
            const appointments = await model.bookingsModel.find({ coachId }, { _id: 0, __v: 0 });
            if (appointments.length > 0) {
                res.status(200).json(appointments);
            } else {
                res.status(400).json({
                    message: "Could not find any bookings"
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await model.usersModel.find({ userId });
        if (user.length == 0) {
            res.status(400).json({
                message: "User Id is not valid"
            });
        } else {
            const appointments = await model.bookingsModel.find({ userId }, { _id: 0, __v: 0 });
            if (appointments.length > 0) {
                res.status(200).json(appointments);
            } else {
                res.status(400).json({
                    message: "Could not find any appointment details"
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
