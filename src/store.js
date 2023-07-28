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
      this.access_token = getCookie('access_token');

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.access_token}`;

      function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
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