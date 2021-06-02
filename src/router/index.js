import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";
import Update from "../views/Update.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: Home,
  },
  {
    path: "/detail/:id",
    name: "Detail Pasien",
    component: Detail,
  },
  {
    path: "/update/:id",
    name: "Update Pasien",
    component: Update,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
