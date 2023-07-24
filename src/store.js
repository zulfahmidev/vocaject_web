import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
  state() {
    return {
      logged: false,
      user: null,
      access_token: null,
    }
  },
  mutations: {
    setLogged(state, user) {
      state.logged = true;
      state.user = user;
      this.access_token = sessionStorage.getItem('access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.access_token}`;
    },
    updateUser(state, user) {
      state.user = user;
    },
    setLogout(state) {
      state.logged = false;
      state.user = null;
      sessionStorage.removeItem('access_token');
    }
  },
});