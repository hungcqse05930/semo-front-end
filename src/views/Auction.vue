<template>
  <div class="container">
    <!-- title -->
    <div class="columns is-variable is-3 is-vcentered">
      <!-- product title -->
      <div class="column is-half">
        <div class="title">
          <!-- fruit -->
          <b-button type="is-text" tag="router-link" :to="'/fruit/' + fruit.id">
            <div style="display: flex; align-items: center;">
            <img :src="fruit.icon_url" style="height: 24px; margin-right: 12px;" />
            <p>{{fruit.title}}</p>
            </div>
          </b-button>
          <!-- title -->
          <p class="auction-title active column">{{auction.title}}</p>
        </div>
        <!-- user -->
        <div class="user">
          <div class="columns">
            <div class="column">
              <div class="columns is-mobile" style="margin: 0;">
                <div class="column is-narrow">
                  <div class="image is-24x24">
                    <img class="is-rounded" :src="user.img_url" />
                  </div>
                </div>
                <div class="column is-narrow">
                  <a class="is-text">{{user.name}} ★ {{user.rate}}</a>
                </div>
                <div class="column"></div>
                <div class="column is-narrow">Mở đấu giá từ {{auction.Auctions[0].date_created}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- remaining time -->
        <div class="remain" style="margin-top: 28px;">
          <div class="columns is-centered">
            <div class="column">
              <data-block>
                <template v-slot:title>THỜI GIAN CÒN LẠI</template>
                <template v-slot:content>{{auction.Auctions[0].remain}}</template>
              </data-block>
            </div>
          </div>
        </div>
        <!-- place bid -->
        <div class="bid" style="margin-top: 40px;">
          <div class="columns is-centered is-vcentered is-mobile">
            <div class="column is-narrow">
              <p class="bidnow">Bạn muốn đấu giá sản phẩm này chứ?</p>
            </div>
            <div class="column is-narrow">
              <b-button
                class="btn"
                type="is-primary"
                @click="isComponentModalActive = true"
                rounded
              >Trả giá ngay</b-button>
            </div>
          </div>
        </div>
        <!-- info -->
        <div class="highlights" style="margin-top: 40px;">
          <div class="columns is-centered is-mobile">
            <div class="column">
              <data-block>
                <template v-slot:title>SẢN LƯỢNG</template>
                <template v-slot:content>{{auction.weight}} tạ</template>
              </data-block>
            </div>
            <div class="column">
              <data-block>
                <template v-slot:title>GIÁ HIỆN TẠI</template>
                <template v-slot:content>{{auction.price_cur}}đ</template>
              </data-block>
            </div>
            <div class="column">
              <data-block>
                <template v-slot:title>BƯỚC GIÁ</template>
                <template v-slot:content>{{auction.price_step}}đ</template>
              </data-block>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
      <!-- product media -->
      <div class="column is-half">
        <b-carousel
          has-drag
          autoplay
          pause-hover
          :pause-info="false"
          :interval="3000"
          repeat
          class="banners"
        >
          <b-carousel-item v-for="(item, i) in media" :key="i">
            <section>
              <img :src="item.media_url" />
            </section>
          </b-carousel-item>
        </b-carousel>
      </div>
    </div>

    <!-- divider -->
    <hr />

    <!-- info -->
    <div class="columns is-variable is-3">
      <!-- product info -->
      <div class="column is-half">
        <p class="list-title">Thông tin sản phẩm</p>
        <!-- content -->
        <div class="columns is-multiline" style="margin-top: 24px;">
          <!-- cells -->
          <!-- location -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>VỊ TRÍ</template>
              <template v-slot:content>{{auction.Address.province}}</template>
            </data-cell>
          </div>
          <!-- fruit pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>TỈ LỆ QUẢ</template>
              <template v-slot:content>{{auction.fruit_pct}}%</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>NỒNG ĐỘ ĐƯỜNG</template>
              <template v-slot:content>{{auction.sugar_pct}}%</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>CÂN NẶNG TRUNG BÌNH MỖI QUẢ</template>
              <template v-slot:content>{{auction.weight_avg}}g</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>ĐƯỜNG KÍNH TRUNG BÌNH MỖI QUẢ</template>
              <template v-slot:content>{{auction.diameter_avg}}cm</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>GIÁ KHỞI ĐIỂM</template>
              <template v-slot:content>{{auction.price_init}}</template>
            </data-cell>
          </div>
          <!-- info -->
          <div class="column is-full is-mobile">
            <p class="cell-title">THÔNG TIN CHI TIẾT</p>
          </div>
          <div class="column is-full is-mobile">
            <p class="cell-title">{{auction.notes}}</p>
          </div>
        </div>
      </div>

      <!-- bids -->
      <div class="column is-half">
        <p class="list-title">Ai đã đấu giá?</p>
        <div style="margin-top: 24px;">
          <b-table class="table" :columns="columns" :data="bids" :mobile-cards="false"></b-table>
        </div>
      </div>
    </div>

    <!-- divider -->
    <hr />

    <!-- similar auctions -->
    <div class="similar" style="margin-top: 40px;">
      <auction-carousel-list :auctions="similar">
        <template v-slot:title>Sản phẩm tương tự</template>
        <!-- similar -->
      </auction-carousel-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import AuctionCarouselList from "../components/AuctionCarouselList";
// import DataBlock from "../components/DataBlock";
// import DataCell from "../components/DataCell";

export default {
  components: {
    'DataBlock': () => import('../components/DataBlock'),
    'DataCell': () => import('../components/DataCell'),
    'AuctionCarouselList': () => import('../components/AuctionCarouselList'),
  },
  props: ["id"],
  created() {
    axios.put(`/auction/update/${this.id}`).then(() => {
      this.getAuctionInfo();
      this.getAuctionBids();
      this.getAuctionSimilar();
    });
  },
  destroyed() {
    this.$destroy();
  },
  methods: {
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`;
    },
    close() {
      this.isComponentModalActive = false;
    },
    getAuctionInfo() {
      axios.get(`/auction/${this.id}`).then((response) => {
        this.auction = response.data;
        // fruit config
        this.fruit = {
          id: this.auction.fruit_id,
          title: this.auction.Fruit.title,
          icon_url: this.auction.Fruit.icon_url || "",
        };

        // user config
        this.user = {
          id: this.auction.User.id,
          name: this.auction.User.name,
          img_url: this.auction.User.img_url,
          rate: this.auction.User.rate,
        };

        // media config
        this.media = this.auction.ProductMedia;
      });
    },
    getAuctionBids() {
      axios.get(`/auction_bid/auction/${this.id}`).then((response) => {
        this.bids = response.data;
      });
    },
    getAuctionSimilar() {
      axios.get(`/auction/similar/${this.id}`).then((response) => {
        this.similar = response.data;
      });
    },
  },
  data() {
    return {
      columns: [
        {
          field: "User.name",
          label: "TÊN NGƯỜI DÙNG",
        },
        {
          field: "amount",
          label: "TRẢ GIÁ",
        },
        {
          field: "date_created",
          label: "THỜI GIAN",
          numeric: true,
        },
      ],
      isComponentModalActive: false,
      products: [
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
        {
          id: 1,
          title: "Táo này đỉnh vcl các bạn ơi",
          weight: "4,2 tạ",
          pricetext: "Giá hiện tại",
          price: "80.000.000đ",
          timetext: "Thời gian còn lại",
          time: "4 tháng 21 ngày",
          address: {
            province: "Long An",
          },
        },
      ],
      fruit: {
        id: 0,
        title: "",
        icon_url: "",
      },
      user: Object,
      auction: Object,
      media: Array,
      bids: Array,
      similar: Array,
    };
  },
};
</script>

<style>
.table {
  background-color: #ffffff00;
}
</style>