const db = require("../../utils/db")
const AppointmentService = require('../services/appointmentService');

class AppointmentController {
  // Récupérer tous les rendez-vous
  static async getAppointments(req, res) {
    try {
      console.log(db);
      const appointments = await AppointmentService.getAllAppointments(db);
      res.status(200).json(appointments); // Envoie les rendez-vous sous forme de JSON
    } catch (error) {
      res.status(500).send({ error: error.message }); // Gestion des erreurs
    }
  }

  // Récupérer un rendez-vous par son ID
  static async getAppointmentById(req, res) {
    const { id } = req.params;
    try {
      const appointment = await AppointmentService.getAppointmentById(req.db, id);
      if (!appointment) {
        return res.status(404).send({ error: 'Appointment not found' });
      }
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  // Créer un nouveau rendez-vous
  static async createAppointment(req, res) {
    const { date, time, type } = req.body;
    try {
      const newAppointment = await AppointmentService.createAppointment(req.db, date, time, type);
      res.status(201).json(newAppointment); // Retourne le nouveau rendez-vous créé
    } catch (error) {
      res.status(400).send({ error: error.message }); // Erreur en cas de problème avec les données fournies
    }
  }

  // Mettre à jour un rendez-vous existant
  static async updateAppointment(req, res) {
    const { id } = req.params;
    const { date, time, type } = req.body;
    try {
      const updatedAppointment = await AppointmentService.updateAppointment(req.db, id, date, time, type);
      if (!updatedAppointment) {
        return res.status(404).send({ error: 'Appointment not found' });
      }
      res.status(200).json(updatedAppointment); // Retourne le rendez-vous mis à jour
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  // Supprimer un rendez-vous
  static async deleteAppointment(req, res) {
    const { id } = req.params;
    try {
      await AppointmentService.deleteAppointment(req.db, id);
      res.status(204).send(); // Retourne un statut 204 sans corps (suppression réussie)
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = AppointmentController;
