
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE guests (
    guest_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL,
    genre VARCHAR(50),
    language VARCHAR(50),
    rated VARCHAR(10), -- e.g. PG-13, R
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE theaters (
    theater_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location TEXT NOT NULL,
    total_screens INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seats (
    seat_id SERIAL PRIMARY KEY,
    screen_id INT NOT NULL REFERENCES screens(screen_id) ON DELETE CASCADE,
    seat_number VARCHAR(10) NOT NULL,
    seat_type VARCHAR(20) DEFAULT 'REGULAR', -- REGULAR, PREMIUM, VIP
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(screen_id, seat_number)
);

CREATE TABLE showtimes (
    showtime_id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL REFERENCES movies(movie_id) ON DELETE CASCADE,
    screen_id INT NOT NULL REFERENCES screens(screen_id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    ticket_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    guest_id INT REFERENCES guests(guest_id) ON DELETE SET NULL,
    showtime_id INT NOT NULL REFERENCES showtimes(showtime_id) ON DELETE CASCADE,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED, REFUNDED
    UNIQUE(user_id, showtime_id, booking_time)
);

-- Optional Tables: Enforce that either user_id OR guest_id must be present
ALTER TABLE bookings
ADD CONSTRAINT chk_user_or_guest
CHECK (
    (user_id IS NOT NULL AND guest_id IS NULL)
    OR (user_id IS NULL AND guest_id IS NOT NULL)
);

CREATE TABLE booked_seats (
    booked_seat_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
    seat_id INT NOT NULL REFERENCES seats(seat_id),
    price DECIMAL(10,2) NOT NULL,
    UNIQUE(booking_id, seat_id)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50), -- e.g., CREDIT_CARD, PAYPAL
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'SUCCESS' -- SUCCESS, FAILED, REFUNDED
);
