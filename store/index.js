import Vuex from 'vuex';

const store = () => {
  return new Vuex.Store({
    state: {
      isLoggedIn : false,
      token: null
    }
  });
};

export default store
