select u.username, h.hobby, h.description, h.hobby_image, h.id
from users u
JOIN hobbies h ON u.id = h.user_id
WHERE u.id = 1