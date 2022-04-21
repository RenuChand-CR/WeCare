const express = require('express');
const controller = require('../controller/tracker');

const router = express.Router();

router.post('/users', controller.registerUser);

router.post('/users/login', controller.loginUser);

router.post('/coaches', controller.registerCoach);

router.post('/coaches/login', controller.loginCoach);

router.get('/coaches/all', controller.getCoaches);

router.get('/coaches/:coachId', controller.getCoach);

router.get('/users/:userId', controller.getUser);

router.post('/users/booking/:userId/:coachId', controller.bookAppointment);

router.put('/booking/:bookingId', controller.changeAppointment);

router.delete('/booking/:bookingId', controller.cancelAppointment);

router.get('/coaches/booking/:coachId', controller.getCoachAppointments);

router.get('/users/booking/:userId', controller.getUserAppointments);

router.all('*', (req, res, next) => {
  let err = new Error("Invalid Path");
  err.status = 404;
  next(err);
});

module.exports = router;
