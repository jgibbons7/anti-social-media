select u.username, h.hobby
from users u
JOIN hobbies h ON u.id = h.user_id
WHERE id = 1