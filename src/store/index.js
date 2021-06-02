import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listPasien: [],
    pagination: {
      amountOfData: 0,
      currentPage: 1,
      limit: 10,
      startFrom: 0,
    },
  },
  mutations: {
    setListPasien(state, payload) {
      state.listPasien = payload;
    },
    setPagination(state, payload) {
      state.pagination = payload;
    },
  },
  actions: {
    fetchListPasien: ({ commit }, page, limit) => {
      return new Promise((resolve, reject) => {
        const pages = page ? `?page=${page}&` : "";
        const limits = limit ? `limit=${limit}` : "";
        Axios.get(`${process.env.VUE_APP_BACKEND}${pages}${limits}`)
          .then((res) => {
            console.log(res);
            commit("setListPasien", res.data.result.data);
            commit("setPagination", {
              amountOfData: res.data.result.pagination.amountOfData,
              currentPage: res.data.result.pagination.currentPage,
              limit: res.data.result.pagination.limit,
              startFrom: res.data.result.pagination.startFrom,
            });
            resolve(true);
          })
          .catch((err) => {
            console.error(err);
            reject(false);
          });
      });
    },
  },
  modules: {},
  getters: {
    getPagination: ({ pagination }) => {
      return pagination;
    },
    getListPasien: ({ listPasien }) => {
      return listPasien;
    },
  },
});
