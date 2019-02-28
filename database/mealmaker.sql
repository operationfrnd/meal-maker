DROP DATABASE IF EXISTS mealmaker;
CREATE DATABASE mealmaker;
-- command for root user and no password
-- mysql -u root < database/mealmaker.sql
-- DROP TABLE IF EXISTS Users;

USE mealmaker;
        INSERT INTO users (username, password, salt, loggedIn)
        VALUES ("dave", "mealmaker", "salt", )
-- USERS table to hold id, username, and hashed password
CREATE TABLE users (
  id INTEGER AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL,
  password TEXT(4294967295) NOT NULL,
  salt VARCHAR(100) NOT NULL,
  loggedIn VARCHAR(50) NOT NULL DEFAULT 'true',
  PRIMARY KEY (id)
);

-- 
-- RECIPES TABLE that holds the recipe name and ID for query 
CREATE TABLE recipes (
  id INTEGER AUTO_INCREMENT NOT NULL,
  recipe TEXT NOT NULL,
  idRecipieFoodNutrition INTEGER NOT NULL,
  recipeImageLink VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- INGREDIENTS TABLE populated to auto complete query by user
CREATE TABLE ingredient (
  id INTEGER AUTO_INCREMENT NOT NULL,
  ingredient VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- Dislikes table, holds user's disliked recipes 
CREATE TABLE dislikes (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idUsers INTEGER NOT NULL,
  idRecipes TEXT NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- Saved recipes, holds user's id and id recipe      
CREATE TABLE saved (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idUsers INTEGER NOT NULL,
  idRecipes INTEGER NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- INSERT INTO recipeOfTheDay (name, link, instructions, idRecipe, recipeImageLink, cookTime, date) 
-- VALUES ("Quick Pepperoni Calzones", "gF5STeRxX7Q", "Preheat oven to 350\nIn a small bowl, mix pepperoni, pasta sauce and mozzarella cheese.\nOn a lightly floured surface, divide dough into four portions.\nRoll each into a 6-in. circle; top each with a scant 1/3 cup pepperoni mixture. Fold dough over filling; pinch edges to seal.\nPlace on a greased baking sheet.\nBrush milk over tops; sprinkle with Parmesan cheese and, if desired, Italian seasoning.\nBake 20-25 minutes or until golden brown.", 995521, "https://i.ytimg.com/vi/gF5STeRxX7Q/hqdefault.jpg", 30, 19);
-- RECIPE OF THE DAY, holds recipes so there are no repeats for recipe of the day
CREATE TABLE recipeOfTheDay (
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  instructions TEXT NOT NULL,
  idRecipe INTEGER NOT NULL,
  recipeImageLink VARCHAR(255) NOT NULL,
  cookTime INTEGER NOT NULL,
  date INTEGER NOT NULL,
  PRIMARY KEY (id)
);
-- ---

-- RECIPE'S INGREDIENTS use to keep record for comparison    
-- One recipe id may have multiple idIngredients     
CREATE TABLE recipesIngredients (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idRecipe INTEGER NOT NULL,
  ingredients TEXT NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- Foreign Keys 
-- ---
-- ALTER TABLE `Dislikes` ADD FOREIGN KEY (idUsers) REFERENCES `Users` (`id`);
-- ALTER TABLE `Dislikes` ADD FOREIGN KEY (idRecipes) REFERENCES `Recipes ` (`id`);
-- ALTER TABLE `Saved` ADD FOREIGN KEY (idUsers) REFERENCES `Users` (`id`);
-- ALTER TABLE `Saved` ADD FOREIGN KEY (idRecipes) REFERENCES `Recipes ` (`id`);
-- ALTER TABLE `Recipe of the Day` ADD FOREIGN KEY (idRecipe) REFERENCES `Recipes ` (`id`);
-- ALTER TABLE `recipe's ingredients` ADD FOREIGN KEY (idRecipes) REFERENCES `Recipes ` (`id`);
-- ALTER TABLE `recipe's ingredients` ADD FOREIGN KEY (idIngredients) REFERENCES `Ingredients` (`id`);
-- ---
-- Table Properties
-- ---
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Recipes ` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Ingredients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Dislikes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Saved` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Recipe of the Day` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `recipe's ingredients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ---
-- Test Data
-- ---
-- INSERT INTO `Users` (`id`,`username`,`password`) VALUES
-- ('','','');
-- INSERT INTO `Recipes ` (`id`,`recipe`,`idRecipieFoodNutrition`) VALUES
-- ('','','');
-- INSERT INTO `Ingredients` (`id`,`ingredient`) VALUES
-- ('','');
-- INSERT INTO `Dislikes` (`id`,`idUsers`,`idRecipes`) VALUES
-- ('','','');
-- INSERT INTO `Saved` (`id`,`idUsers`,`idRecipes`) VALUES
-- ('','','');
-- INSERT INTO `Recipe of the Day` (`id`,`link`,`idRecipe`) VALUES
-- ('','','');
-- INSERT INTO `recipe's ingredients` (`id`,`idRecipes`,`idIngredients`) VALUES
-- ('','','');```