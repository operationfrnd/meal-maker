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
import VideoPlayer from '../VideoPlayer.jsx';
import RecipeList from './RecipeList.jsx';
import SavedRecipes from './SavedRecipes.jsx';
import Search from './Search.jsx';
import RecipeInstructions from '../login/RecipeInstructions.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'search',
    };
    this.onClick = this.onClick.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  onClick() {
    console.log('clicked');
  }

  // function to change between search and saved view
  changeView(option) {
    this.setState({
      view: option,
    });
  }

  render() {
    const { recipe, recipes, savedRecipes, ingredients, getRecipes } = this.props;
    // const { ingredients } = this.state;
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Meal Maker</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href={Search}>Search</a></li>
              <li><a href={SavedRecipes}>Saved</a></li>
              {/* <li><a href="collapsible.html">JavaScript</a></li> */}
            </ul>
          </div>
        </nav>




        <div className="nav">
          <span className="logo">Meal Maker</span>
          <button type="button" className={this.state.view === 'search'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('search')}>
            Search
          </button>
          <button type="button" className={this.state.view === 'saved'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('saved')}>
            Saved Recipes
          </button>
        </div>

        <div className="main">
          {this.state.view === 'search'
            ? <Search ingredients={ingredients} recipe={recipe} getRecipes={getRecipes} />
            : <SavedRecipes savedRecipes={savedRecipes} />
          }
        </div>
      </div>
    )
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
