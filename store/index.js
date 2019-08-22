import Vuex from 'vuex';

const store = () => {
  return new Vuex.Store({
    state: {
      isLoggedIn : false,
      token: null
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
      makeAsLoggedIn(context) {
        context.commit('makeAsLoggedIn');
      },
      markAsLoggedOut(context) {
        context.commit('makeAsLoggedIn');
      }
    }
  });
};

export default store
