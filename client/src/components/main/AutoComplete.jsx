import React from 'react';
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
      <div className="auto-complete">
        <input value={text} onChange={this.onTextChange} type="text" />
        {this.renderSuggestions()}
        <button className="showMore" type="button" onClick={() => this.addIngredient(text)}>Add</button>
        <button className="search" type="button" onClick={() => getRecipes(selectedIngredients.join(', '))}>Search</button>
        <ul>
          {selectedIngredients.map(ingredient => (
            <li key={ingredient}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AutoComplete;
