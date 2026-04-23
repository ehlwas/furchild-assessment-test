CREATE DATABASE IF NOT EXISTS pet_meal_subscription;
USE pet_meal_subscription;

CREATE TABLE `meal_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `meal_plans` (`name`, `description`, `price`, `is_active`) VALUES
('Basic Chicken Plan', 'Fresh minced chicken meal suitable for adult dogs.', 49.99, 1),
('Premium Beef & Veggie', 'High protein beef with fresh vegetables for active dogs.', 79.99, 1),
('Inactive Puppy Plan', 'Specialized nutrition for puppies.', 59.99, 0);

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `meal_plan_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `status` enum('active','paused','cancelled') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `fk_sub_meal_plan` (`meal_plan_id`),
  CONSTRAINT `fk_sub_meal_plan` FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
