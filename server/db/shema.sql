

USE railway;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialities;
DROP TABLE IF EXISTS categories;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE categories (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE specialities (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL UNIQUE,
  category_id INT NOT NULL,
  CONSTRAINT fk_specialities_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE artisans (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  rating        DECIMAL(3,1) NOT NULL DEFAULT 0,
  about         TEXT,
  email         VARCHAR(255),
  website       VARCHAR(255),
  photo         VARCHAR(255),
  city          VARCHAR(120),
  department    VARCHAR(120),  
  speciality_id INT NOT NULL,
  is_top        TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT fk_artisans_speciality
    FOREIGN KEY (speciality_id) REFERENCES specialities(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX idx_artisans_city (city),
  INDEX idx_artisans_department (department),
  INDEX idx_artisans_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
