<template>
  <div class="menu-container">
    {{index}}
    <b-menu activable>
      <b-menu-list label="Chức năng">
        <b-menu-item :active.sync="index" label="📜 Hồ sơ"></b-menu-item>
        <b-menu-item label="🏡 Địa chỉ"></b-menu-item>
        <b-menu-item label="🎫 Xác thực"></b-menu-item>
        <b-menu-item label="🔑 Mật khẩu"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  name: "UserInfoMenu",
  // props: ["index"],
  data() {
    return {
      index: true,
    };
  },
  created() {
    switch (this.$router.currentRoute.fullPath) {
      case "/user/info":
        this.isInfo = true;
        this.isAddress = this.isIdentity = this.isPassword = false;
        break;

      case "/user/address":
        this.isAddress = true;
        this.isInfo = this.isIdentity = this.isPassword = false;
        break;

      case "/user/identity":
        this.isIdentity = true;
        this.isInfo = this.isAddress = this.isPassword = false;
        break;

      case "/user/password":
        this.isPassword = true;
        this.isInfo = this.isAddress = this.isIdentity = false;
        break;
    }
  },
};
</script>

<style scoped>
</style>