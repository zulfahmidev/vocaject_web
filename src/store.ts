import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
  state() {
    return {
      logged: localStorage.getItem('logged') === 'true',
      user: JSON.parse(localStorage.getItem('user') || null) || null,
      access_token: getCookie('access_token'),
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
      sessionStorage.removeItem('access_token');
    }
  },
});

function getCookie(cname: any) {
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
  return null;
}