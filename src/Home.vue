<!--src/views/Home.vue-->
<template>
  <div v-if="!$route.meta.noLayout" class = "container">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
      <div class="sidebar-title">
        <strong><span class="icon-list"></span> Menu </strong>
      </div>
      <div v-for="(menu, index) in menuList" :key="index">
        <h2 @click="toggleMenu(index)" :class="{ on: menu.open }">
          <span :class="menu.icon"></span> {{ menu.title }}
        </h2>
        <ul v-show="menu.open">
          <li v-for="(item, subIndex) in menu.items" :key="subIndex">
            <button @click="selectMenu(item)">
              <span class="icon-caret-right"></span> {{ item.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Header Section -->
      <div class="header">
        <div class="logo">
          <h1>
            <img src="" class="radius-circle rotate-hover" height="50" alt="" />
            DynamoDB Operator
          </h1>
        </div>
        <h1 class="username">Dear {{ username }}</h1>
        <div class="logout">
          <a class="button button-little bg-red" href="#" @click="logout">
            <span class="icon-power-off"></span> Logout
          </a><br><br>
          <a class="button button-little bg-red" href="#" @click="goHome">
            <span class="icon-power-off"></span> Home
          </a>
        </div>
      </div>

      <div class="content-area">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script>


import {analyticService} from "@/api/userAnalyticAPI.js";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";

export default {

  data() {
    return {
      username: localStorage.getItem('currentUser'),
      menuList: [
        {
          title: "Student Manager",
          icon: "icon-pencil-square-o",
          open: false,
          items: [
            { name: "See all Students", router: "/student/list"},
            { name: "Search Student", router: "/student/search" },
            { name: "Add Student", router: "/student/add"},
            { name: "Update Student", router: "/student/update" },
            { name: "Delete Student", router: "/student/delete" }
          ]
        },
        {
          title: "Data Analysis",
          icon: "icon-pencil-square-o",
          open: false,
          items: [
            { name: "See the Analysis", router: "/analysis"}
          ]
        }
      ]
    };
  },
  methods: {

    goHome() {
      this.$router.push("/welcome");
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    toggleMenu(index) {
      this.menuList[index].open = !this.menuList[index].open;
    },
    selectMenu(item) {
      this.$router.push(item.router);
    },

  },
  setup() {
    const route = useRoute(); // 获取当前路由信息

    // 用户数据收集函数
    const trackUserActivity = () => {
      const userData = {
        time: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        url: route.path,
      };

      console.log("Sending user data:", userData);

      analyticService.collectUserData(userData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => console.error("Error tracking user activity:", error));
    };

    // **监听路由变化，每次用户跳转页面时自动触发 trackUserActivity**
    watch(route, () => {
      trackUserActivity(); // 自动收集数据
    });

    // // **页面加载时也收集一次数据**
    // onMounted(() => {
    //   trackUserActivity();
    // });

    return {};
  }

};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  //position: fixed;
  overflow-y: auto;
}

.sidebar-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.sidebar h2 {
  cursor: pointer;
  padding: 10px;
  background: #34495e;
  margin-top: 10px;
  color: white;
}

.sidebar h2.on {
  background: #1abc9c;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li button {
  display: block;
  background: none;
  border: none;
  color: white;
  padding: 8px;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background: #ecf0f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-area {
  flex-grow: 1;
  padding: 20px;
}
</style>
