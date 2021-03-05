DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS feedBack;
DROP TABLE IF EXISTS comment;
CREATE TABLE users(
  id SERIAL not null primary key,
  username  VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);

CREATE TABLE feedBack(
  id SERIAL not null primary key,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  game VARCHAR(255) NOT NULL,
  CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comment(
  id SERIAL not null primary key,
  feedBackId INT NOT NULL,
  userId INT NOT NULL,
  content VARCHAR(255) NOT NULL,
  CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_feedback FOREIGN KEY (feedBackId) REFERENCES feedBack(id) ON DELETE CASCADE
);