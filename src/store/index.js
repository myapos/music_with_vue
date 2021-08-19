import { createStore } from "vuex";
import { auth, usersCollection } from "@/includes/firebase";
import { Howl } from "howler";

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = state.sound.seek();
      state.duration = state.sound.duration();
    },
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        // eslint-disable-next-line comma-dangle
        payload.password,
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit("toggleAuth");
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit("toggleAuth");
      }
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit("toggleAuth");
    },
    async signout({ commit }, payload) {
      await auth.signOut();
      commit("toggleAuth");
      if (payload.route.meta.requiresAuth) {
        payload.router.push({ name: "home" });
      }
    },
    async newSong({ commit, state, dispatch }, payload) {
      if (!state.sound.playing) {
        commit("newSong", payload);
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }

      state.sound.on("play", () => {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit("updatePosition");
      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch("progress");
        });
      }
    },
  },
  // modules: {
  // },
});
