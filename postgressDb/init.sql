DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS comment;
CREATE TABLE users(
  id SERIAL not null primary key,
  username  TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE feedback(
  id SERIAL not null primary key,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(9000) NOT NULL,
  game VARCHAR(255) NOT NULL,
  CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comment(
  id SERIAL not null primary key,
  feedbackId INT NOT NULL,
  userId INT NOT NULL,
  content VARCHAR(9000) NOT NULL,
  CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_feedback FOREIGN KEY (feedbackId) REFERENCES feedback(id) ON DELETE CASCADE
);