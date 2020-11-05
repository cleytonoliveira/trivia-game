import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import { saveToken, saveName } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      isDisabled: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  checkValidity() {
    const { userName, email } = this.state;

    if (userName.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    } else if (userName.length === 0 || email.length === 0) {
      this.setState({ isDisabled: true });
    }
  }

  async handleInputChange({ target }) {
    const { name, value } = target;

    await this.setState({
      [name]: value,
    });

    this.checkValidity();
  }

  async handleButtonClick() {
    const API_RESPONSE = await fetchToken();
    const TOKEN = API_RESPONSE.token;

    localStorage.setItem('token', TOKEN);

    const { dispatchSaveToken, dispatchSaveName } = this.props;
    dispatchSaveToken(TOKEN);

    const { userName } = this.state;
    dispatchSaveName(userName);
  }

  render() {
    const { userName, email, isDisabled } = this.state;

    return (
      <div>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            value={ email }
            placeholder="Your Gravatar email"
            data-testid="input-gravatar-email"
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="userName">
          <input
            id="userName"
            name="userName"
            value={ userName }
            placeholder="Your player name"
            data-testid="input-player-name"
            onChange={ this.handleInputChange }
          />
        </label>

        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleButtonClick }
          >
            Jogar
          </button>
        </Link>

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>

      </div>
    );
  }
}

Login.propTypes = {
  dispatchSaveToken: propTypes.func.isRequired,
  dispatchSaveName: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveToken: (token) => dispatch(saveToken(token)),
  dispatchSaveName: (name) => dispatch(saveName(name)),
});

export default connect(null, mapDispatchToProps)(Login);