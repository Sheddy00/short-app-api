const request = require('supertest');
const app = require('../app'); // Assure-toi que ton app est exportée correctement

describe('Appointment API', () => {
  let appointmentId;

  // Test de création d'un rendez-vous
  it('should create a new appointment', async () => {
    const res = await request(app)
      .post('/appointments')
      .send({
        date: '2024-12-28',
        time: '15:00',
        type: 'Consultation',
      })
      .expect(201);

    appointmentId = res.body.id; // Récupérer l'ID du rendez-vous créé
    expect(res.body).toHaveProperty('id');
    expect(res.body.date).toBe('2024-12-28');
  });

  // Test de récupération d'un rendez-vous par son ID
  it('should get an appointment by ID', async () => {
    const res = await request(app)
      .get(`/appointments/${appointmentId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', appointmentId);
    expect(res.body.date).toBe('2024-12-28');
  });

  // Test de mise à jour d'un rendez-vous
  it('should update an appointment', async () => {
    const res = await request(app)
      .put(`/appointments/${appointmentId}`)
      .send({
        date: '2024-12-29',
        time: '16:00',
        type: 'Suivi',
      })
      .expect(200);

    expect(res.body.date).toBe('2024-12-29');
    expect(res.body.time).toBe('16:00');
  });

  // Test de suppression d'un rendez-vous
  it('should delete an appointment', async () => {
    await request(app)
      .delete(`/appointments/${appointmentId}`)
      .expect(204);
  });
});
