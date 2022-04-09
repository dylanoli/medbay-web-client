import { StateApp } from '.';

const successMutation = {
  setSuccess(state: StateApp, value: false | string) {
    state.success = value;
  },
};

export default successMutation;
