import React from 'react';

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
    const selectedIngredients = this.state.selectedIngredients;
    selectedIngredients.push(ingredient);
    this.setState({
      selectedIngredients: selectedIngredients,
    })
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
      <ul>
        {suggestions.map(ingredient => <li onClick={() => this.suggestionSelected(ingredient)} key={ingredient}>{ingredient}</li>)}
      </ul>
    );
  }

  render() {
    const { text, selectedIngredients } = this.state;
    console.log(text, this)
    return (
      <div>
        <input value={text} onChange={this.onTextChange} type="text" />
        {this.renderSuggestions()}
        <button className="showMore" type="button" onClick={() => this.addIngredient(text)}>Add</button>
        <button className="search" type="button" onClick={() => this.props.getRecipes(selectedIngredients.join(', '))}>Search</button>
      </div>
    );
  }
}

export default AutoComplete;
