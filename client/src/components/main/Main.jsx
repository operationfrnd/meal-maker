// main page view which contains
// 1) a search component (with an input form, a + button and a submit button)
// 2) a saved recipes button that makes the saved recipe component drawer appear
// (with a saved recipes list and a saved recipe list item component)
// 3) text : 'Here a 10 great recipes for you!'
// 4) a recipe list component (with a recipe list item component)

// login view which contains
// 1) a credential component (with username and password input forms, a login button and a signup button)
// 2) a recipe of the day video player component
// 3) a recipe instructions component (with a scrolling list of instructions)
import React from 'react';
import Button from '@material-ui/core/Button';
import SavedRecipes from './SavedRecipes.jsx';
import Search from './Search.jsx';
import Recipe from '../Recipe.jsx';
import logo from '../../../images/clearLogo.png';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'search',
    };
    this.changeView = this.changeView.bind(this);
  }

  // function to change between views
  changeView(option) {
    this.setState({
      view: option,
    });
  }

  render() {
    const {
      selectedRecipe, selectRecipe, recipeOfTheDay, recipes, savedRecipes,
      ingredients, getRecipes, saveRecipe, saveDislikeRecipe, getSavedRecipes, user,
      searchInProgress,
    } = this.props;
    const { view } = this.state;

    return (
      <div>
        <div className="nav">
          <input type="image" src={logo} width="7%" height="auto" onClick={() => this.changeView('search')} />
          <button type="button" className="mealMakerLogo" onClick={() => this.changeView('search')}>mealMaker</button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={view === 'search'
              ? 'nav-selected'
              : 'nav-unselected'}
            onClick={() => this.changeView('search')}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={view === 'saved'
              ? 'nav-selected'
              : 'nav-unselected'}
            onClick={() => {
              getSavedRecipes();
              this.changeView('saved');
            }}
          >
            Saved Recipes
          </Button>
          <Button variant="contained" color="primary" type="button">
            Logout
          </Button>
        </div>

        <div className="main">
          { view === 'search' ? 
            (
              <Search
                ingredients={ingredients}
                recipes={recipes}
                recipeOfTheDay={recipeOfTheDay}
                getRecipes={getRecipes}
                saveRecipe={saveRecipe}
                saveDislikeRecipe={saveDislikeRecipe}
                changeView={this.changeView}
                user={user}
                searchInProgress={searchInProgress}
              />
            )
              : view === 'saved' ? <SavedRecipes savedRecipes={savedRecipes} changeView={this.changeView} selectRecipe={selectRecipe}/>
              :  <Recipe selectedRecipe={selectedRecipe} />
          }
        </div>
      </div>
    );
  }
}

export default Main;
