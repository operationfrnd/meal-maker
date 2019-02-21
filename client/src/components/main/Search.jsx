// component with an input form, a + button and a submit button

import React, { Component, Fragment } from 'react';
import VideoPlayer from '../VideoPlayer.jsx';
import RecipeInstructions from '../login/RecipeInstructions.jsx';
// import PropTypes from "prop-types";
import AutoComplete from './AutoComplete.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <h2>Search</h2>
        <div className="Search-Comp">
          <AutoComplete ingredients={this.props.ingredients} />
          <button className="showMore" type="button">Add</button>
        </div>
        <div className="recipe-of-the-day-container">
          <table>
            <tbody>
              <tr>
                <td className="vidPlayer"><VideoPlayer recipe={recipe} /></td>
                <td className="instructions"><RecipeInstructions recipe={recipe} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Search;
