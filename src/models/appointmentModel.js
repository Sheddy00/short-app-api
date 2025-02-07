class Appointment {
    constructor(id, date, time, type) {
      this.id = id;
      this.date = date;
      this.time = time;
      this.type = type;
    }
  
    static async findAll(db) {
      return await db.query('SELECT * FROM appointment ORDER BY appointment_id ASC');
    }
  
    static async findById(db, id) {
      const result = await db.query('SELECT * FROM appointment WHERE id = $1', [id]);
      return result.rows[0];
    }
  
    static async create(db, appointment) {
      const result = await db.query(
        'INSERT INTO appointment (date, time, type) VALUES ($1, $2, $3) RETURNING *',
        [appointment.date, appointment.time, appointment.type]
      );
      return result.rows[0];
    }
  
    static async update(db, id, appointment) {
      const result = await db.query(
        'UPDATE appointment SET date = $1, time = $2, type = $3 WHERE id = $4 RETURNING *',
        [appointment.date, appointment.time, appointment.type, id]
      );
      return result.rows[0];
    }
  
    static async delete(db, id) {
      await db.query('DELETE FROM appointments WHERE id = $1', [id]);
    }
  }
  
  module.exports = Appointment;
  