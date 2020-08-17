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
          <b-menu activable>
            <b-menu-list label="Chức năng">
              <b-menu-item :active.sync="isProfile" label="📜 Hồ sơ"></b-menu-item>
              <b-menu-item :active.sync="isAddress" label="🏡 Địa chỉ"></b-menu-item>
              <b-menu-item :active.sync="isIdentity" label="🎫 Xác thực"></b-menu-item>
              <b-menu-item :active.sync="isPassword" label="🔑 Mật khẩu"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
        <div class="column">
          <user-info-form :id="id" :user="user" v-if="isProfile"></user-info-form>
          <user-info-address v-if="isAddress"></user-info-address>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  props: ["id"],
  components: {
    UserFirstDescription: () =>
      import("../components/UserInformation/UserFirstDescription"),
    UserInfoForm: () => import("../components/UserInformation/UserInfoForm"),
    UserInfoAddress: () => import("../components/UserInformation/UserInfoAddress")
  },
  created() {
    this.populateData();
  },
  data() {
    return {
      user: {},
      index: 0,
      isProfile: true,
      isAddress: false,
      isIdentity: false,
      isPassword: false
    };
  },
  methods: {
    populateData() {
      if (typeof this.id === "number") {
        axios.get(`/user/info/id/${this.id}`).then((response) => {
          this.user = response.data;
        });
      } else {
        axios
          .get(`/user/info/id/${this.$store.state.user.id}`)
          .then((response) => {
            console.log(response.data);
            this.user = response.data;
          });
      }
    },
  },
};
</script>

<style scoped>
/* li {
  list-style-type: none !important;
  margin: 0 !important;
} */

.personal {
  margin-top: 40px;
}
</style>