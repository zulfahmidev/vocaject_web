import {createStore} from 'vuex'
import axios from 'axios';
import * as Cookies from './Cookies'

export default createStore({
  state() {
    return {
      logged: localStorage.getItem('logged') === 'true',
      user: JSON.parse(localStorage.getItem('user') || null) || null,
      access_token: Cookies.getCookie('access_token'),
    }
  },
  mutations: {
    setLogged(state: any, user: any) {      
      localStorage.setItem('logged', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.access_token}`;
    },
    updateUser(state: any, user: any) {
      state.user = user;
    },
    setLogout(state: any) {
      state.logged = false;
      state.user = null;
      sessionStorage.clear();
      localStorage.clear()
      Cookies.setCookie('access_token', '', '')
      document.cookie = ''
      window.location.reload()
    }
  },
});