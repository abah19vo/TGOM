DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS feedBack;
DROP TABLE IF EXISTS comment;

CREATE TABLE  IF NOT EXISTS user(
    id int(10) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    CONSTRAINT usernameUnique UNIQUE (username),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS feedBack(
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(50),
    content VARCHAR(400),
    game varchar(50),
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

    
CREATE TABLE IF NOT EXISTS comment(
    id INT NOT NULL AUTO_INCREMENT,
    feedBackId INT NOT NULL,
    userId INT NOT NULL,
    content VARCHAR(400),
    PRIMARY KEY (id),
    FOREIGN KEY (feedBackId) REFERENCES feedBack(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);


