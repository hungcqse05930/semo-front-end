<template>
  <div class="card-container">
    <div class="address-info">
      <p class="cell-title">
        <strong>{{address.address}}</strong>
      </p>
      <p class="cell-title">{{address.ward}}</p>
      <p class="cell-title">{{address.district}}</p>
      <p class="cell-title">{{address.province}}</p>
    </div>
    <div class="card-functions">
      <div class="columns is-vcentered">
        <div class="column">
          <b-tag v-if="address.default_address === 1" type="is-primary">Mặc định</b-tag>
        </div>
        <div class="column is-narrow">
          <div class="columns">
            <div class="column">
              <b-button type="is-primary" @click="editAddress">🖊️ Chỉnh sửa</b-button>
            </div>
            <div class="column" v-if="address.default_address === 0">
              <b-button type="is-danger" @click="deleteAddress">🗑️ Xóa</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: ["address"],
  data() {
    return {
    };
  },
  methods: {
    editAddress() {
      alert("click");
    },
    deleteAddress() {
      alert("delete");
    },
  },
};
</script>

<style scoped>
.card-container {
  padding: 24px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 4px #00000016;
}

.card-functions {
  margin-top: 16px;
}
</style>