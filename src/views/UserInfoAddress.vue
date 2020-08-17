<template>
  <div class="container">
    <!-- basic info -->
    <div class="welcome">
      <user-first-description :user="user"></user-first-description>
    </div>
    <!-- subtitle tabs -->
    <div id="sub-nav">
      <div id="sub-content" v-if="typeof this.id !== 'number'">
        <router-link to="/user/info">📝 Thông tin cá nhân</router-link>
        <router-link to="/user/product">📦 Sản phẩm bạn đăng</router-link>
        <router-link to="/user/bid">🛒 Sản phẩm bạn mua</router-link>
        <router-link to="/user/wallet">👛 Ví của bạn</router-link>
      </div>
    </div>

    <!-- content -->
    <div class="personal">
      <div class="columns">
        <div class="column is-2">
          <user-info-menu></user-info-menu>
        </div>
        <div class="column">
          <user-info-form :id="id" :user="user"></user-info-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserInfoMenu from "../components/UserInformation/UserInfoMenu";

export default {
  name: "UserAddress",
  components: {
    UserInfoMenu,
    UserFirstDescription: () =>
      import("../components/UserInformation/UserFirstDescription"),
    UserInfoForm: () => import("../components/UserInformation/UserInfoForm"),
  },
  created() {
    this.populateData();
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    populateData() {
      axios
        .get(`/user/info/id/${this.$store.state.user.id}`)
        .then((response) => {
          this.user = response.data;
        });
    },
  },
};
</script>

<style>
</style>