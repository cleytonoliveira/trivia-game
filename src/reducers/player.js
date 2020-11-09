import {
  SAVE_TOKEN,
  SAVE_NAME,
  SAVE_EMAIL,
  SAVE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
    gravatarImage: '',
  },
  ranking: '',
  token: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };

  case SAVE_NAME:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.name,
      },
    };

  case SAVE_EMAIL:
    return {
      ...state,
      player: {
        ...state.player,
        gravatarEmail: action.gravatarEmail,
      },
    };

  case SAVE_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.score,
      },
    };

  default:
    return state;
  }
}
