CREATE TABLE IF NOT EXISTS appointment(
    appointment_id SERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    time TIME DEFAULT CURRENT_TIME,
    type VARCHAR(255),
    id_user INT REFERENCES users(id_user) 
);

DO $$
    DECLARE
        max_id INT;
    BEGIN
        SELECT MAX(appointment_id) INTO max_id FROM appointment;
        IF max_id IS NOT NULL THEN
            EXECUTE 'ALTER SEQUENCE appointment_appointment_id_seq RESTART WITH ' || (max_id + 1);
        END IF;
    END $$;