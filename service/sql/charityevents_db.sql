DROP DATABASE IF EXISTS charityevents_db;
CREATE DATABASE charityevents_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE charityevents_db;

CREATE TABLE organisations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organisation_id INT NOT NULL,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  short_description VARCHAR(500) NOT NULL,
  full_description TEXT NOT NULL,
  purpose VARCHAR(255) NOT NULL,
  event_date DATETIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  ticket_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  goal_amount DECIMAL(10, 2) NOT NULL,
  current_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  is_suspended TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (organisation_id) REFERENCES organisations(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO organisations (name, description, contact_email, contact_phone, address) VALUES (
  'Ironbark Neighbourhood Fund',
  'A small Adelaide hall fund that pays for soup nights, bike stands, and courtyard music.',
  'hall@ironbarkfund.org.au',
  '(08) 8212 7740',
  '88 Hindley Street, Adelaide SA 5000'
);

INSERT INTO categories (name) VALUES
  ('Soup Night'),
  ('Bike Repair'),
  ('Book Sale'),
  ('Courtyard Concert'),
  ('Plant Swap');

INSERT INTO events (
  organisation_id, category_id, name, short_description, full_description,
  purpose, event_date, location, ticket_price, goal_amount, current_amount, is_suspended
) VALUES
(
  1, 4,
  'Hindley Courtyard Hour',
  'One hour of courtyard music behind the Hindley hall.',
  'Chairs face the brick wall. The set is short. Soft drinks only. Ticket money pays the next month of hall lighting.',
  'Hall lighting',
  '2026-10-09 18:30:00',
  'Hindley',
  16.00, 5500.00, 1800.00, 0
),
(
  1, 1,
  'Norwood Soup Night',
  'A seated soup service in a Norwood church room.',
  'Two sittings. Bread on each table. The kitchen is volunteer-run. Fees pay the same week of pantry bags.',
  'Pantry bags',
  '2026-10-23 17:45:00',
  'Norwood',
  14.00, 4200.00, 1400.00, 0
),
(
  1, 2,
  'Port Adelaide Bike Stand',
  'A Saturday stand for puncture repair and lights.',
  'Bring the bike. Parts are limited. There is no booking sheet. Optional cash goes to spare tubes kept at the hall.',
  'Spare tubes',
  '2026-11-14 09:00:00',
  'Port Adelaide',
  0.00, 2800.00, 620.00, 0
),
(
  1, 3,
  'Unley Book Tables',
  'Tables of donated paperbacks in the Unley room.',
  'Take two books. Leave a coin if you want. Cash on the day supports the reading boxes used after school.',
  'Reading boxes',
  '2026-11-28 10:30:00',
  'Unley',
  0.00, 1900.00, 410.00, 0
),
(
  1, 5,
  'April Plant Swap',
  'A finished swap held in April on the hall steps.',
  'This swap is over. Cuttings still went home in used pots. The remaining cash paid for potting mix.',
  'Potting mix',
  '2026-04-19 11:00:00',
  'Glenelg',
  0.00, 1200.00, 880.00, 0
),
(
  1, 1,
  'Glenelg Soup Night',
  'A later sitting of soup near the Glenelg tram stop.',
  'Doors at 6 pm. No reserved seats. Leftover soup goes out the side door. Tickets pay winter stock.',
  'Winter stock',
  '2026-12-04 18:00:00',
  'Glenelg',
  12.00, 3600.00, 3600.00, 0
),
(
  1, 4,
  'July Courtyard Hour',
  'A winter concert already held in the Hindley courtyard.',
  'The night is finished. The courtyard was cold. The money still paid for two extra heaters.',
  'Hall heaters',
  '2026-07-11 18:00:00',
  'Hindley',
  10.00, 2400.00, 1500.00, 0
),
(
  1, 5,
  'Norwood Plant Swap',
  'A late-year swap of cuttings and seed envelopes.',
  'Bring a cutting if you have one. Take one if you do not. Optional cash pays for labels and bags.',
  'Seed bags',
  '2026-12-12 10:00:00',
  'Norwood',
  0.00, 900.00, 210.00, 0
),
(
  1, 3,
  'Unlisted Courtyard Draw',
  'Withdrawn after a review of the collection rules.',
  'Staff withdrew this row because the draw did not follow the fund policy. It stays in the database and must not appear on the public site.',
  'Internal review',
  '2026-10-16 16:00:00',
  'Hindley',
  4.00, 700.00, 20.00, 1
),
(
  1, 2,
  'Unley Bike Stand',
  'An evening stand for lights and bells before dark.',
  'The stand closes at 7:30 pm. Children wait with a parent. Any cash on the table pays for spare lights.',
  'Spare lights',
  '2026-11-06 17:00:00',
  'Unley',
  8.00, 2100.00, 2100.00, 0
);
