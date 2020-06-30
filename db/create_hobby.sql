INSERT INTO hobbies (hobby, hobby_image, user_id)
VALUES ($1, $2, $3);

SELECT * from hobbies
WHERE user_id = $3;