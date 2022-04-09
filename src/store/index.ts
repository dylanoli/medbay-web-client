import Vue from 'vue';
import Vuex from 'vuex';
import errorMutation from './errorMutation';
import successMutation from './successMutation';

Vue.use(Vuex);
export interface StateApp {
  error: false | string;
  success: false | string;
}
const store = new Vuex.Store({
  state: {
    error: false,
    success: false,
  },
  mutations: {
    ...errorMutation,
    ...successMutation
  },
});

export default store;
