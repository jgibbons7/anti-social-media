CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  type VARCHAR(30)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30),
  password VARCHAR(500),
  profileImage text,
  favorites INT REFERENCES favorites(id)
);

CREATE TABLE user_info (
  id SERIAL PRIMARY KEY REFERENCES users(id),
  age INT,
  aboutMe VARCHAR(500),
  gender VARCHAR(10),
  politics VARCHAR(10),
  religion VARCHAR(10)
);

CREATE TABLE hobbies (
  id SERIAL PRIMARY KEY,
  hobby VARCHAR(50),
  description VARCHAR(600),
  user_id INT REFERENCES users(id)
);

-- DROP

drop table hobbies;
drop table user_info;
drop table users;
drop table favorites;