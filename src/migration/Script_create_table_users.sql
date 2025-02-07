CREATE TABLE IF NOT EXISTS users(
    id_user SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL  
);

DO $$
    DECLARE
        max_id INT;
    BEGIN
        SELECT MAX(id_user) INTO max_id FROM users;
        IF max_id IS NOT NULL THEN
            EXECUTE 'ALTER SEQUENCE users_id_user_seq RESTART WITH ' || (max_id + 1);
        END IF;
    END $$;