import Vue from 'vue'
import Router from 'vue-router'
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')
const Shoppingcart = () => import('../views/shoppingcart/Shoppingcart')
const Category = () => import('../views/category/category')
const Detail = () => import('../views/detail/Detail')

Vue.use(Router)

const router = new Router({
  //base: '/supermall/',
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component:Home
    },
    {
      path: '/profile',
      component:Profile
    },{
      path: '/shoppingcart',
      component:Shoppingcart
    },{
      path: '/category',
      component:Category
    },{
      path: '/detail',
      component:Detail
    }
  ]
})


export default router
