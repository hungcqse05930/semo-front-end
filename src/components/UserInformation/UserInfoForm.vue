<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-quarters">
        <p class="title">👦 Thông tin lý lịch</p>
        <!-- phone -->
        <form @submit.prevent="changeInfo">
          <b-field horizontal label="Điện thoại">
            <b-input :value="user.phone" disabled expanded></b-input>
          </b-field>
          <b-field horizontal label="Tên đầy đủ">
            <b-input :value="user.name" expanded></b-input>
          </b-field>
          <b-field horizontal label="Ngày sinh">
            <b-datepicker v-model="dob" trap-focus expanded></b-datepicker>
          </b-field>
          <b-field horizontal label="Giới tính">
            <b-select :value="user.gender" expanded>
              <option value="0">Nữ</option>
              <option value="1">Nam</option>
            </b-select>
          </b-field>
          <br />
          <div style="display: flex; justify-content: center;">
            <b-button type="is-primary" native-type="submit">💾 Lưu thay đổi</b-button>
          </div>
        </form>
      </div>
      <div class="column">
        <p class="title">📷 Ảnh đại diện</p>
        <div class="columns is-centered">
          <div class="column is-narrow">
            <avatar-upload :user="this.user"></avatar-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AvatarUpload from "../UserInformation/AvatarUpload";

export default {
  name: "UserInfoForm",
  components: {
    AvatarUpload: () => import("../UserInformation/AvatarUpload"),
  },
  props: ["id", "user"],
  data() {
    return {
      dob: new Date(this.user.dob.toString()),
    };
  },
  methods: {
    changeInfo() {
      alert("hello");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 32px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px #00000017;
  border-radius: 10px;
}

.title {
  color: #07d390;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 800;
}
</style>