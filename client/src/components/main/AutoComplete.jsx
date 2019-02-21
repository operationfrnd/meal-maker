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
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
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
    const { text } = this.state;
    return (
      <div>
        <input value={text} onChange={this.onTextChange} type="text" />
        {this.renderSuggestions()}
        <h4>please work</h4>
      </div>
    );
  }
}

export default AutoComplete;
