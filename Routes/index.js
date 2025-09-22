const mockRoutes = require('./MockRoutes/MockRoutes');
const mongoRoutes = require('./MongoData/MongoData');
const { bookingRouter } = require("./bookings");
const { doctorRouter } = require("./doctor");
const { forumRouter } = require("./forum");
const { patientRouter } = require("./patient");
const { userRouter } = require("./user");

module.exports = { mockRoutes, mongoRoutes, bookingRouter, doctorRouter, forumRouter, userRouter, patientRouter };