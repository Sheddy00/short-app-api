const Appointment = require('../models/appointmentModel'); // Importation du modèle

class AppointmentService {
  // Récupérer tous les rendez-vous
  static async getAllAppointments(db) {
    try {
      const appointments = await Appointment.findAll(db);
      return appointments;
    } catch (error) {
      throw new Error('Unable to retrieve appointments: ' + error.message);
    }
  }

  // Récupérer un rendez-vous par son ID
  static async getAppointmentById(db, id) {
    try {
      const appointment = await Appointment.findById(db, id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new Error('Unable to retrieve appointment: ' + error.message);
    }
  }

  // Créer un nouveau rendez-vous
  static async createAppointment(db, date, time, type) {
    try {
      const appointment = new Appointment(null, date, time, type); // Créer une nouvelle instance de rendez-vous
      const createdAppointment = await Appointment.create(db, appointment);
      return createdAppointment;
    } catch (error) {
      throw new Error('Unable to create appointment: ' + error.message);
    }
  }

  // Mettre à jour un rendez-vous existant
  static async updateAppointment(db, id, date, time, type) {
    try {
      const appointment = new Appointment(id, date, time, type); // Mettre à jour les informations du rendez-vous
      const updatedAppointment = await Appointment.update(db, id, appointment);
      return updatedAppointment;
    } catch (error) {
      throw new Error('Unable to update appointment: ' + error.message);
    }
  }

  // Supprimer un rendez-vous
  static async deleteAppointment(db, id) {
    try {
      await Appointment.delete(db, id);
    } catch (error) {
      throw new Error('Unable to delete appointment: ' + error.message);
    }
  }
}

module.exports = AppointmentService;
