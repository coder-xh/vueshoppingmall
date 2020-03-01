import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// const Home = () => import()

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: () => import("views/home/Home")
  },
  {
    path: "/category",
    component: () => import("views/category/Category")
  },
  {
    path: "/profile",
    component: () => import("views/profile/Profile")
  },
  {
    path: "/cart",
    component: () => import("views/cart/Cart")
  },
  {
    path: "/detail/:iid",
    component: () => import("views/detail/detail")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
