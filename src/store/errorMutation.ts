import { StateApp } from '.';

const errorMutation = {
  setError(state: StateApp, value: false|string) {
    state.error = value;
  },
};

export default errorMutation;
