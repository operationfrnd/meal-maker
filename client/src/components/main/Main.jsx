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
import VideoPlayer from '../VideoPlayer.jsx';
import RecipeList from './RecipeList.jsx';
import SavedRecipes from './SavedRecipes.jsx';
import Search from './Search.jsx';
import RecipeInstructions from '../login/RecipeInstructions.jsx';
import Recipe from '../Recipe.jsx';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'search',
    };
    this.changeView = this.changeView.bind(this);
  }

  // function to change between search and saved view
  changeView(option) {
    this.setState({
      view: option,
    });
  }



  render() {
    const { selectedRecipe, selectRecipe, recipeOfTheDay, recipes, savedRecipes, ingredients, getRecipes, saveRecipe, saveDislikeRecipe, getSavedRecipes } = this.props;
    const { view } = this.state;

    return (
      <div>
        <div className="nav">
          <span className="mealMakerLogo">mealMaker</span>
          <Button variant="contained" color="primary" type="button" className={this.state.view === 'search'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('search')}
          >
            Search
          </Button>
          <Button variant="contained" color="primary" type="button" className={this.state.view === 'saved'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => {
              getSavedRecipes();
              this.changeView('saved');
            }}
          >
            Saved Recipes
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
                selectRecipe={selectRecipe}
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


//     <div>
//       <div className="logo">
//         {/* <img></img> */}
//       </div>
//       <h2>Hello Main</h2>
//       <div className="search">
//         <Search ingredients={ingredients} />
//       </div>
//       <div className="recipe-list">
//         <RecipeList recipe={recipes} onClick={this.onClick} />
//       </div>
//       <div className="saved-recipes">
//         <SavedRecipes savedRecipes={savedRecipes} />
//       </div>
// <div className="recipe-of-the-day-container">
//   <table>
//     <tbody>
//       <tr>
//         <td className="vidPlayer"><VideoPlayer recipe={recipe} /></td>
//         <td className="instructions"><RecipeInstructions recipe={recipe} /></td>
//       </tr>
//     </tbody>
//   </table>
// </div>
//     </div>
//   );
// }
// }

export default Main;
