import React from 'react';
import Button from '@material-ui/core/Button';
// import './AutoComplete.css';

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    const { ingredients } = this.props;
    this.ingredients = ingredients;
    this.state = {
      suggestions: [],
      text: '',
      // ingredientList: [],
      selectedIngredients: [],
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
  }


  onTextChange(e) {
    const { value } = e.target;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.props.ingredients.sort().filter(v => regex.test(v));
    }
    this.setState({ suggestions, text: value });
  }


  addIngredient(ingredient) {

    const { selectedIngredients } = this.state;
    selectedIngredients.push(ingredient);
    this.setState({
      selectedIngredients,
      text: '',
    });
  }

  suggestionSelected(value) {
    this.setState({
      text: value,
      suggestions: [],
    });
    this.addIngredient(value);
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="auto-ulist">
        {suggestions.map(ingredient => <li className="auto-list" onClick={() => this.suggestionSelected(ingredient)} key={ingredient}>{ingredient}</li>)}
      </ul>
    );
  }

  render() {
    const { text, selectedIngredients } = this.state;
    const { getRecipes } = this.props;
    return (
      <div className="AutoCompleteComponent">
        <div className="auto-complete">
          <input value={text} onChange={this.onTextChange} type="text" />
          {this.renderSuggestions()}
          <ul>
            {selectedIngredients.map(ingredient => (
              <li key={ingredient}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="buttons">
          {/* <Button className="showMore" variant="contained" color="primary" type="button" onClick={() => this.addIngredient(text)}>Add</Button> */}
          <Button className="search" variant="contained" color="primary" type="button" onClick={() => getRecipes(selectedIngredients.join(', '))}>Search</Button>
        </div>
      </div>
    );
  }
}

export default AutoComplete;
