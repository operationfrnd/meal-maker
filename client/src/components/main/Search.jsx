// component with an input form, a + button and a submit button

import React, { Component, Fragment } from 'react';
// import PropTypes from "prop-types";
import AutoComplete from './AutoComplete.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Search</h2>
        <AutoComplete ingredients={this.props.ingredients}/>
        <h3>more stuff</h3>
      </div>
    );
  }
}

export default Search;
