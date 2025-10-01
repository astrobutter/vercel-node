import { Router } from 'express';

import authRoutes from './auth.routes.js';
import doctorRoutes from './doctor.routes.js';
import bookingRoutes from './booking.routes.js';
import forumRoutes from './forum.routes.js';
import userRoutes from './user.routes.js';
import uploadRoutes from './upload.routes.js';
import appointmentRoutes from './appointment.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/doc', doctorRoutes);
router.use('/booking', bookingRoutes);
router.use('/forum', forumRoutes);
router.use('/users', userRoutes);
router.use('/users', userRoutes);
router.use('/uploads', uploadRoutes);
router.use('/appointment', appointmentRoutes);

export default router;


// const mongoRoutes = require('./MongoData/MongoData');
// const { bookingRouter } = require("./bookings");
// const { doctorRouter } = require("./doctor");
// const { forumRouter } = require("./forum");
// const { patientRouter } = require("./patient");
// const { userRouter } = require("./user");

// module.exports = { mongoRoutes, bookingRouter, doctorRouter, forumRouter, userRouter, patientRouter };