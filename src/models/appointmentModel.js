const APPOINTMENT_TYPES = Object.freeze({
    WALK: 'walk',
    MOVIE: 'movie',
    MEAL: 'meal',
    GAME: 'game',
    PHOTOS: 'photos',
    OTHER: 'other'
});

class Appointment {
    constructor(id, date, time, type) {
      this.id = id;
      this.date = date;
      this.time = time;
      this.validateType(type);
      this.type = type;
    }

    validateType(type) {
      if (!Object.values(APPOINTMENT_TYPES).includes(type)) {
          throw new Error(`Type de rendez-vous invalide. Types autorisés: ${Object.values(APPOINTMENT_TYPES).join(', ')}`);
      }
    }

    static async findAll(db) {
      const result = await db.query(
        'SELECT a.appointment_id, a.date, a.time, a.type, a.id_user FROM appointment a ORDER BY appointment_id ASC', 
        []
      );

      return result.rows;
    }
  
    static async findById(db, id) {
      const result = await db.query(
        'SELECT a.appointment_id, a.date, a.time, a.type, a.id_user FROM appointment a WHERE appointment_id = $1',
        [id]
      );
      
      if (!result.rows[0]) throw new Error('Dating not found');

      return result.rows[0];
    }
  
    static async create(db, appointment) {
      const result = await db.query(
        'INSERT INTO appointment (date, time, type, id_user) VALUES ($1, $2, $3, $4) RETURNING *',
        [appointment.date, appointment.time, appointment.type, appointment.idUser]
      );

      return result.rows[0];
    }
  
    static async update(db, id, appointment) {
      const existingAppointment = await Appointment.findById(db, id);

      const result = await db.query(
        'UPDATE appointment SET date = $1, time = $2, type = $3 WHERE appointment_id = $4 RETURNING *',
        [appointment.date, appointment.time, appointment.type, id]
      );

      if (!result.rows[0]) throw new Error('Dating not found');

      return result.rows[0];
    }
  
    static async delete(db, id) {
      await db.query(
        'DELETE FROM appointments WHERE appointment_id = $1',
        [id]
      );
    }
  }
  
  module.exports = { Appointment, APPOINTMENT_TYPES };
  