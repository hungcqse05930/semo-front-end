<template>
  <div class="address-container">
    <div class="columns is-mobile">
      <div class="column">
        <p class="title">🏡 Địa chỉ</p>
      </div>
      <div class="column is-narrow">
        <b-button type="is-primary" @click="isEdit = true">➕ Thêm địa chỉ mới</b-button>
      </div>
    </div>
    <!-- addresses list -->
    <div class="addresses">
      <div class="columns is-multiline is-variable is-3">
        <div
          class="column is-full-mobile is-half is-one-third-fullhd"
          v-for="(address, i) in addresses"
          :key="i"
        >
          <user-info-address-info :address="address"></user-info-address-info>
        </div>
      </div>
    </div>

    <!-- modals -->
    <b-modal :active.sync="isEdit" destroy-on-hide>
      <user-info-address-modal :address="address" title="➕ Thêm địa chỉ mới"></user-info-address-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    UserInfoAddressInfo: () => import("../UserInformation/UserInfoAddressInfo"),
    UserInfoAddressModal: () => import("./UserInfoAddressModal"),
  },
  created() {
      this.populateData()
  },
  data() {
    return {
      addresses: [],
      isEdit: false,
    };
  },
  methods: {
    populateData() {
      axios.get(`/address/id/${this.$store.state.user.id}`).then((response) => {
        this.addresses = response.data;
      });
    },
    addAddress() {
        alert('click')
    }
  },
};
</script>

<style scoped>
.title {
  color: #07d390;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 800;
}
</style>