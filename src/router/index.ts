import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import About from "../views/About.vue";
import Profile from "../views/Profile.vue";
import Posts from "../views/Posts.vue";
import Post from "../views/Post.vue";
import CreatePost from "../views/CreatePost.vue";
import EditPost from "../views/EditPost.vue";
import UnpublishedPosts from "../views/UnpublishedPosts.vue";
import AdminPostPreview from "../views/AdminPostPreview.vue";
import RegisteredUsers from "../views/RegisteredUsers.vue";
import LikedPosts from "../views/LikedPosts.vue";
import NotFound from "../views/NotFound.vue";

const user = localStorage.getItem("userInfo") || "";

const signedIn = (to: any, from: any, next: any) => {
  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const signedOut = (to: any, from: any, next: any) => {
  if (!user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const admin = (to: any, from: any, next: any) => {
  let value;
  if (user) value = JSON.parse(user);

  if (value && value.isAdmin) {
    next();
  } else {
    next({ name: "NotFound" });
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    beforeEnter: signedIn,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: signedIn,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: signedOut,
  },
  {
    path: "/profile/liked",
    name: "LikedPosts",
    component: LikedPosts,
    beforeEnter: signedOut,
  },
  {
    path: "/profile/admin/posts",
    name: "UnpublishedPosts",
    component: UnpublishedPosts,
    beforeEnter: admin,
  },
  {
    path: "/profile/admin/posts/preview/:id",
    name: "AdminPostPreview",
    component: AdminPostPreview,
    beforeEnter: admin,
  },
  {
    path: "/profile/admin/users",
    name: "RegisteredUsers",
    component: RegisteredUsers,
    beforeEnter: admin,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/post/:id",
    name: "Post",
    component: Post,
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: CreatePost,
    beforeEnter: admin,
  },
  {
    path: "/posts/edit/:id",
    name: "EditPost",
    component: EditPost,
    beforeEnter: admin,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
