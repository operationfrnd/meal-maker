DROP DATABASE IF EXISTS mealmaker;
CREATE DATABASE mealmaker;
-- command for root user and no password
-- mysql -u root < database/mealmaker.sql
-- DROP TABLE IF EXISTS Users;

USE mealmaker;
        
-- USERS table to hold id, username, and hashed password
CREATE TABLE Users (
  id INTEGER AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  loggedIn VARCHAR(50) NOT NULL DEFAULT 'true',
  PRIMARY KEY (id)
);

-- 
-- RECIPES TABLE that holds the recipe name and ID for query 
CREATE TABLE Recipes (
  id INTEGER AUTO_INCREMENT NOT NULL,
  recipe TEXT NOT NULL,
  idRecipieFoodNutrition INTEGER NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- INGREDIENTS TABLE populated to auto complete query by user
CREATE TABLE Ingredient (
  id INTEGER AUTO_INCREMENT NOT NULL,
  ingredient VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- Dislikes table, holds user's disliked recipes 
CREATE TABLE Dislikes (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idUsers INTEGER NOT NULL,
  idRecipes INTEGER NOT NULL,
  PRIMARY KEY (id)
);
-- ---
-- Saved recipes, holds user's id and id recipe      
CREATE TABLE Saved (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idUsers INTEGER NOT NULL,
  idRecipes INTEGER NOT NULL,
  PRIMARY KEY (id)
);
-- ---

-- RECIPE OF THE DAY, holds recipes so there are no repeats for recipe of the day
CREATE TABLE RecipeOfTheDay (
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  instructions TEXT NOT NULL,
  idRecipe INTEGER NOT NULL,
  recipeImageLink VARCHAR(255) NOT NULL,
  cooktime INTEGER NOT NULL,
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