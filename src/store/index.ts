import UserDTO from '@/models/UserDTO';
import Vue from 'vue';
import Vuex from 'vuex';
import errorMutation from './errorMutation';
import successMutation from './successMutation';
import userMutation from './userMutation';

Vue.use(Vuex);
export interface StateApp {
  error: false | string;
  success: false | string;
  user: UserDTO;
}
const store = new Vuex.Store({
  state: {
    error: false,
    success: false,
    user: new UserDTO()
  },
  mutations: {
    ...errorMutation,
    ...successMutation,
    ...userMutation
  },
});

export default store;
