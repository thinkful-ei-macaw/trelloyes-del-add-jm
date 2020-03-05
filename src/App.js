import React, { Component } from 'react';
import List from './List';
import './App.css';

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {}
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      lists: this.props.store.lists,
      allCards: this.props.store.allCards
    };
  }

  // lists: [
  //   {
  //     id: '1',
  //     header: 'First list',
  //     cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
  //   },

  handleDeleteCard = id => {
    const { lists, allCards } = this.state;
    this.setState({
      allCards: this.omit(allCards, id),
      lists: lists.map(list =>
        Object.assign(list, {
          cardIds: list.cardIds.filter(cardId => cardId !== id)
        })
      )
    });
  };

  handleAddRandom = (id) => {
    let newRandom = this.newRandomCard();
      const newAllCards = {
        ...this.state.allCards,
        [newRandom.id] : newRandom
      }
      this.setState({
        lists: this.state.lists.map(list => {
          if(list.id === id) {
            const current = list.cardIds;
            current.push(newRandom.id);
            return {...list, cardIds: current}
          } else return list;
        })
        ,
        allCards: newAllCards
      })
  }

  newRandomCard = () => {
    const id =
      Math.random()
        .toString(36)
        .substring(2, 4) +
      Math.random()
        .toString(36)
        .substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum'
    };
  };

  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
        key === keyToOmit ? newObj : { ...newObj, [key]: value },
      {}
    );
  }

  render() {
    const { lists, allCards } = this.state;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {lists.map(list => (
            <List
              id={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onAddCard={this.handleAddRandom}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
