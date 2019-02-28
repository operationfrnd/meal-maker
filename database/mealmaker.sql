DROP DATABASE IF EXISTS mealmaker;
CREATE DATABASE mealmaker;
-- command for root user and no password
-- mysql -u root < database/mealmaker.sql

USE mealmaker;
-- DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id INTEGER AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL,
  password TEXT(4294967295) NOT NULL,
  salt VARCHAR(100) NOT NULL,
  loggedIn VARCHAR(50) NOT NULL DEFAULT true,
  PRIMARY KEY (id)
);

CREATE TABLE Recipes (
  id INTEGER AUTO_INCREMENT NOT NULL,
  recipe TEXT(255) NOT NULL,
  idRecipeFoodNutrition INTEGER NOT NULL,
  recipeImageLink VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE Ingredient (
  id INTEGER AUTO_INCREMENT NOT NULL,
  ingredient VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE Dislikes (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idUsers INTEGER NOT NULL,
  idRecipes INTEGER (7) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idUsers) REFERENCES Users (id)
);


CREATE TABLE Saved (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idUsers INTEGER NOT NULL,
  idRecipes INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idUsers) REFERENCES Users (id)
);


CREATE TABLE RecipeOfTheDay (
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


CREATE TABLE recipesIngredients (
  id INTEGER AUTO_INCREMENT NOT NULL,
  idRecipes INTEGER NOT NULL,
  idIngredients INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idRecipes) REFERENCES Recipes (id)
);

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
-- INSERT INTO `RecipeOfTheDay` (`id`,`link`,`idRecipe`) VALUES
-- ('','','');
-- INSERT INTO `recipesIngredients` (`id`,`idRecipes`,`idIngredients`) VALUES
-- ('','','');
--

-- Foreign Keys 
--
-- ALTER TABLE Dislikes ADD CONSTRAINT FOREIGN KEY (idUsers) REFERENCES Users (id);
-- ALTER TABLE Dislikes ADD FOREIGN KEY (idRecipes) REFERENCES Recipes (id);
-- ALTER TABLE Saved ADD FOREIGN KEY (idUsers) REFERENCES Users (id);
-- ALTER TABLE Saved ADD FOREIGN KEY (idRecipes) REFERENCES Recipes (id);
-- ALTER TABLE `Recipe of the Day` ADD FOREIGN KEY (idRecipe) REFERENCES Recipes (id);
-- ALTER TABLE `recipe's` ingredients ADD FOREIGN KEY (idRecipes) REFERENCES Recipes (id);
-- ALTER TABLE `recipe's` ingredients ADD FOREIGN KEY (idIngredients) REFERENCES Ingredients (id);
--
-- Table Properties
--
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Recipes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Ingredients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Dislikes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Saved` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Recipe of the Day` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `recipe's ingredients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;