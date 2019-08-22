import Vuex from 'vuex';

const store = () => {
  return new Vuex.Store({
    state: {
      isLoggedIn : false,
      token: null
    },
    getters: {
      isLoggedIn(state) {
        return state.isLoggedIn;
      },
      authToken(state) {
        return state.token;
      }
    },
    mutations: {
      makeAsLoggedIn(state) {
        state.isLoggedIn = true;
      },
      makeAsLoggedOut(state) {
        state.isLoggedIn = false;
      }
    },
    actions: {
      markAsLoggedIn(context) {
        context.commit('makeAsLoggedIn');
      },
      markAsLoggedOut(context) {
        context.commit('makeAsLoggedIn');
      }
    }
  });
};

export default store
