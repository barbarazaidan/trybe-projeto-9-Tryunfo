import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deleteSaveCard = this.deleteSaveCard.bind(this);
    // this.inputSize = this.inputSize.bind(this);
    // this.attributeValidation = this.attributeValidation.bind(this);
    // this.buttonDisabled = this.buttonDisabled.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      cardsSaved: [],
    };
  }

  onInputChange(event) {
    // console.log(event.target);
    const { target, target: { name } } = event;
    // this.setState({ name: value }); // se coloco sem colchetes, o nome da chave passa a ser 'name'
    const value = target.type === 'checkbox' ? target.checked : target.value; // se eu não usar esta expressão, ele pega o valor do checkbox, mas como on e não true ou false.
    this.setState({ [name]: value });
  }

  onSaveButtonClick() {
    const {
      cardName,
      cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const savedCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    // o spred (...) faz com que eu pegue os elementos(objetos) que já estavam no array cardsSaved e os espalhe no novo array que estou criando, depois coloco a vírgula e adiciono o novo elemento(objeto) que quero incluir no array.

    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }

    this.setState(
      (previousState) => ({ cardsSaved: [...previousState.cardsSaved, savedCard] }),
    );

    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    });
  }

  deleteSaveCard(card) {
    console.log('console do botão excluir: ', card);
    this.setState((previousState) => (
      { cardsSaved: previousState.cardsSaved.filter(({ cardName }) => cardName !== card) }
    ));

    // const { cardsSaved } = this.state;
    // console.log('estado ao clicar no botão excluir: ', cardsSaved);
    // const findCard = cardsSaved.find((card) => card.cardTrunfo === true);
    // console.log('findCard: ', findCard)
    // if (findCard === undefined) {
    //   this.setState({ hasTrunfo: false })
    // }
  }

  // -----------------------------------------------------------------------------------------------------------------
  // NÃO ENTENDI PORQUE ESSAS FUNÇÕES NÃO FUNCIONARAM
  // attributeValidation() {
  //   let disableButton = true;
  //   console.log('disabe: ', disableButton)
  //   if (+cardAttr1 <= 90 && +cardAttr2 <= 90 && +cardAttr3 <= 90) {
  //     console.log('disabe: ', disableButton)
  //     disableButton = false;
  //   }

  //   if (disableButton === false) {
  //     if ((+cardAttr1 + +cardAttr2 + +cardAttr3) <= 210) {
  //       disableButton = false
  //     }
  //   }

  //   this.setState( { isSaveButtonDisabled: disableButton } );
  // }

  // inputSize() {
  //   const {
  //     cardName,
  //     cardDescription,
  //     cardImage,
  //     cardRare,
  //   } = this.state;
  //   console.log(cardName.length)

  //   if (cardName.length > 0 && cardDescription.length > 0 && cardImage.length > 0 && cardRare.length > 0) {
  //     return 'yes';
  //   } return 'no'
  // }

  // buttonDisabled() {
  //   console.log('OLÁAAA BUTTON')
  //   if (this.inputSize() === 'yes') {
  //     console.log(this.inputSize())
  //     this.attributeValidation
  //   } else {
  //     this.setState( { isSaveButtonDisabled: true } );
  //   }
  // }

  // ----------------------------------------------------------------------------------------------------------------

  render() {
    // console.log(this.state)
    const {
      cardName,
      cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      cardsSaved,
    } = this.state;

    // NÃO ESTÁ LENDO A FUNÇÃO this.buttonDisabled;
    // if (isSaveButtonDisabled === true) {
    //   console.log('OLÁAAA');
    //   this.buttonDisabled;
    // }

    let isSaveButtonDisabled = true;
    const maxAtt = 90;
    const maxTotalAtt = 210;

    if (cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0
      && cardRare.length > 0) {
      isSaveButtonDisabled = false;
    } else {
      isSaveButtonDisabled = true;
    }

    if (isSaveButtonDisabled === false) {
      if ((+cardAttr1 + +cardAttr2 + +cardAttr3) <= maxTotalAtt
        && (+cardAttr1 >= 0 && +cardAttr1 <= maxAtt
        && +cardAttr2 >= 0 && +cardAttr2 <= maxAtt
        && +cardAttr3 >= 0 && +cardAttr3 <= maxAtt)) {
        isSaveButtonDisabled = false;
      } else {
        isSaveButtonDisabled = true;
      }
    }

    if (hasTrunfo) {
      const findCard = cardsSaved.find((card) => card.cardTrunfo === true);
      console.log('findCard: ', findCard);
      if (findCard === undefined) {
        this.setState({ hasTrunfo: false, cardTrunfo: false });
      }
    }

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />

        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />

        <ul>
          {cardsSaved.map((card) => ( // apesar de ter várias linhas, este é um retorno implícito, pois tudo cabe em uma única linha, se eu quiser
            <li key={ card.cardName }>
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.deleteSaveCard(card.cardName) }
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
