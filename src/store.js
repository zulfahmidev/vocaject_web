import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
  state() {
    return {
      logged: false,
      user: null,
    }
  },
  mutations: {
    setLogged(state, user) {
      state.logged = true;
      state.user = user;
      let access_token = sessionStorage.getItem('access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    },
    setLogout(state) {
      state.logged = false;
      state.user = null;
      sessionStorage.removeItem('access_token');
    }
  },
});