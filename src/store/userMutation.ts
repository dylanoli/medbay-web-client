import UserDTO from '@/models/UserDTO';
import { StateApp } from '.';

const userMutation = {
  setUser(state: StateApp, value: UserDTO) {
    state.user = value;
  },
};

export default userMutation;
