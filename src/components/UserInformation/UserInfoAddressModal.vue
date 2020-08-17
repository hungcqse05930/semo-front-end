<template>
  <div class="card-container">
    <p class="title">{{title}}</p>
    <!-- form -->
    <div class="form">
      <form @submit.prevent="addAddress">
        <!-- address -->
        <b-field label="Địa chỉ">
          <!-- province -->
          <b-autocomplete
            placeholder="Tỉnh/Thành phố"
            :data="dataP"
            field="title"
            clearable
            expanded
            required
            validation-message="Đừng bỏ trống chứ!"
            @typing="loadProvince"
            @select="option => province = option"
          >
            <template slot-scope="props">
              <div class="media-content">{{ props.option.title }}</div>
            </template>
            <template slot="empty">Không tìm thấy tỉnh/thành phố nào</template>
          </b-autocomplete>
        </b-field>
        <!-- district -->
        <b-field>
          <b-autocomplete
            placeholder="Quận/Huyện"
            :data="dataD"
            field="title"
            clearable
            expanded
            required
            validation-message="Đừng bỏ trống chứ!"
            @typing="loadDistrict"
            @select="option => district = option"
          >
            <template slot-scope="props">
              <div class="media-content">{{ props.option.title }}</div>
            </template>
            <template slot="empty">Không tìm thấy quận/huyện nào</template>
          </b-autocomplete>
        </b-field>
        <!-- ward -->
        <b-field>
          <b-autocomplete
            placeholder="Phường/Xã"
            :data="dataW"
            field="title"
            clearable
            expanded
            required
            validation-message="Đừng bỏ trống chứ!"
            @typing="loadWard"
            @select="option => ward = option"
          >
            <template slot-scope="props">
              <div class="media-content">{{ props.option.title }}</div>
            </template>
            <template slot="empty">Không tìm thấy phường/xã nào</template>
          </b-autocomplete>
        </b-field>
        <!-- address info -->
        <b-field>
          <b-input
            v-model="address_info"
            placeholder="Số nhà, tên đường/phố, làng/ấp"
            required
            :value="address.address"
            validation-message="Đừng bỏ trống số nhà bạn chứ!"
            expanded
          ></b-input>
        </b-field>
        <b-button native-type="submit" style="margin: 0 auto;">💾 Lưu địa chỉ</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "debounce";

export default {
  props: ["address", "title"],
  data() {
    return {
      // address
      dataP: [],
      dataD: [],
      dataW: [],
      // for v-model
      province: "",
      district: "",
      ward: "",
      address_info: "",
    };
  },
  methods: {
    //  load provinces
    loadProvince: debounce(function (province) {
      if (!province.length) {
        this.dataP = [];
        return;
      }

      axios
        .get("/address/province")
        .then(({ data }) => {
          this.dataP = data.LtsItem.map((item) => ({
            id: item.ID,
            title: item.Title,
          })).filter((option) => {
            return (
              option.title
                .toString()
                .toLowerCase()
                .indexOf(province.toLowerCase()) >= 0
            );
          });
        })
        .catch((error) => {
          this.dataP = [];
          throw error;
        });
    }, 250),
    // load districts
    loadDistrict: debounce(function (district) {
      if (!district.length) {
        this.dataD = [];
        return;
      }

      axios
        .get(`/address/province/${this.province.id}/district`)
        .then(({ data }) => {
          this.dataD = data
            .map((item) => ({
              id: item.ID,
              title: item.Title,
            }))
            .filter((option) => {
              return (
                option.title
                  .toString()
                  .toLowerCase()
                  .indexOf(district.toLowerCase()) >= 0
              );
            });
        })
        .catch((error) => {
          this.dataD = [];
          throw error;
        })
    }, 250),
    // load ward
    loadWard: debounce(function (ward) {
      if (!ward.length) {
        this.dataW = [];
        return;
      }

      axios
        .get(`/address/district/${this.district.id}/ward`)
        .then(({ data }) => {
          this.dataW = data
            .map((item) => ({
              id: item.ID,
              title: item.Title,
            }))
            .filter((option) => {
              return (
                option.title
                  .toString()
                  .toLowerCase()
                  .indexOf(ward.toLowerCase()) >= 0
              );
            });
        })
        .catch((error) => {
          this.dataW = [];
          throw error;
        })
    }, 250),
    addAddress() {

    },
  },
};
</script>

<style>
</style>