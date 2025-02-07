const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');

// Routes pour les rendez-vous
router.get('/', AppointmentController.getAppointments);
router.get('/:id', AppointmentController.getAppointmentById);
router.post('/', AppointmentController.createAppointment);
router.put('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);

module.exports = router;
