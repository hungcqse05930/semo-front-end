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
                <div
                  class="column is-narrow"
                >Mở đấu giá từ {{format_date(auction.Auctions[0].date_created)}}</div>
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
                <template v-slot:content>{{auction.Auctions[0].remain}} ngày</template>
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
              <b-button class="btn" type="is-primary" @click="enterBid" rounded>Trả giá ngay</b-button>
              <!-- enterBid -->
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
                <template v-slot:content>{{numberWithCommas(auction.Auctions[0].price_cur)}}đ</template>
              </data-block>
            </div>
            <div class="column">
              <data-block>
                <template v-slot:title>BƯỚC GIÁ</template>
                <template v-slot:content>{{numberWithCommas(auction.price_step)}}đ</template>
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
              <template v-slot:content>{{numberWithCommas(auction.price_init)}}đ</template>
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

    <!-- modals -->
    <!-- instruction modal -->
    <b-modal
      :active.sync="isFirstModal"
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div style="overflow: hidden;">
        <div class="columns is-centered">
          <div class="column is-two-thirds">
            <div class="instruction-container">
              <b-carousel
                v-model="index"
                class="carousel"
                :autoplay="false"
                :has-drag="true"
                :pause-info="true"
                :pause-hover="true"
                :interval="10000"
                :repeat="false"
              >
                <b-carousel-item v-for="(step, i) in steps" :key="i" style="height: 100%;">
                  <section>
                    <div style="display: flex; flex-flow: column; align-items: center;">
                      <p
                        class="list-title"
                        style="text-align: center; margin-top: 40px; margin-bottom: 40px;"
                      >{{step.title}}</p>
                      <p style="font-size: 80px;">{{step.icon}}</p>
                      <p
                        class="cell-title"
                        style="text-align: center; margin-top: 40px; word-wrap: break-word; padding-left: 40px; padding-right: 40px; font-weight: 700;"
                      >{{step.description}}</p>
                      <b-button
                        rounded
                        type="is-primary"
                        style="margin: 40px 0;"
                        @click="next"
                      >{{step.button}}</b-button>
                    </div>
                  </section>
                </b-carousel-item>
              </b-carousel>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- bidding modal -->
    <b-modal
      :active.sync="isBiddingModal"
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="card">
        <!-- current info -->
        <div class="columns is-mobile">
          <div class="column">
            <!-- current price -->
            <data-block>
              <template v-slot:title>GIÁ HIỆN TẠI</template>
              <template v-slot:content>{{numberWithCommas(auction.Auctions[0].price_cur)}}đ</template>
            </data-block>
          </div>
          <div class="column">
            <!-- step price -->
            <data-block>
              <template v-slot:title>BƯỚC GIÁ</template>
              <template v-slot:content>{{numberWithCommas(auction.price_step)}}đ</template>
            </data-block>
          </div>
        </div>
        <p
          class="cell-title"
          style="text-align: center; margin-top: 24px; font-size: 17px;"
        >{{auction.Auctions[0].remain}} | {{bids.length}} lượt đấu giá</p>

        <!-- break -->
        <hr />

        <!-- place bid -->
        <div style="margin-top: 24px;">
          <form @submit.prevent="placeBid">
            <p class="filter-title active">🤑 Trả giá</p>
            <!-- notification -->
            <b-notification
              type="is-danger"
              has-icon
              aria-close-label="Đóng"
              role="alert"
              :active.sync="error"
              class="error-notification"
            >{{error_msg}}</b-notification>
            <div class="columns is-mobile">
              <div class="column">
                <b-input
                  v-model="amount"
                  type="number"
                  :placeholder="(numberWithCommas(auction.Auctions[0].price_cur + auction.price_step)) + 'đ'"
                ></b-input>
              </div>
              <div
                class="column is-one-third-mobile is-one-quarter-tablet is-one-quarter-desktop is-one-fifth-widescreen"
              >
                <b-button
                  :disabled="amount.length === 0"
                  native-type="submit"
                  type="is-primary"
                  expanded
                  rounded
                >Đấu giá</b-button>
              </div>
            </div>
          </form>
          <br />
          <div class="columns is-mobile">
            <div class="column is-narrow">
              <div class="columns is-mobile">
                <div class="column is-narrow">
                  <p class="cell-title" style="padding: 0">👛 Ví của bạn:</p>
                </div>
                <div class="column is-narrow">
                  <p class="active">23,500,000đ</p>
                </div>
              </div>
            </div>
            <div class="column"></div>
            <div class="column is-narrow">
              <router-link to="/">NẠP TIỀN</router-link>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- success modal -->
    <b-modal
      :active.sync="isSuccessModal"
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <div class="card" style="width: fit-content;">
        <div class="columns is-centered is-mobile">
          <div class="column">
            <p style="font-size: 80px; text-align: center;">✔️</p>
            <p class="cell-content">Bạn đã đấu giá thành công!</p>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
// import AuctionCarouselList from "../components/AuctionCarouselList";
// import DataBlock from "../components/DataBlock";
// import DataCell from "../components/DataCell";

export default {
  components: {
    DataBlock: () => import("../components/DataBlock"),
    DataCell: () => import("../components/DataCell"),
    AuctionCarouselList: () => import("../components/AuctionCarouselList"),
  },
  props: ["id"],
  created() {
    this.refreshData();
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
    refreshData() {
      axios.put(`/auction/update/${this.id}`).then(() => {
        this.getAuctionInfo();
        this.getAuctionBids();
        this.getAuctionSimilar();
      });
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
    enterBid() {
      if (this.$store.state.user.first_bids) {
        this.isFirstModal = true;
      } else {
        this.isBiddingModal = true;
      }
    },
    openBid() {
      this.isFirstModal = false;
      this.isBiddingModal = true;
    },
    placeBid() {
      axios
        .post("/auction_bid/", {
          auction_id: this.id,
          bidder_user_id: this.$store.state.user.id,
          amount: this.amount,
        })
        .then(() => {
          this.refreshData();
          this.isBiddingModal = false;
          this.amount = "";

          //
          this.isBiddingModal = false;
          this.isSuccessModal = true;

          let vm = this;
          setTimeout(function () {
            vm.isSuccessModal = false;
          }, 2500);
        })
        .catch((error) => {
          this.error = true;
          this.error_msg = error.response.data.message;
        });
    },
    next() {
      if (this.index === this.steps.length - 1) {
        this.isFirstModal = false;
        this.isBiddingModal = true;
      } else {
        ++this.index;
      }
    },
    format_date(value) {
      return moment(String(value)).format("DD/MM/YYYY, HH:MM:SS");
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  data() {
    return {
      index: 0,
      steps: [
        {
          title: "Đấu giá",
          icon: "💡",
          description:
            "Để bạn đấu giá thành công, hãy xem qua hướng dẫn này nhé! Sẽ không lâu đâu.",
          button: "Được luôn!",
        },
        {
          title: "Điều kiện đấu giá",
          icon: "👛",
          description:
            "Hãy đảm bảo ví semo của bạn có đủ 10% giá trị hiện tại của mặt hàng.",
          button: "Tiếp theo",
        },
        {
          title: "Điều kiện đấu giá",
          icon: "👛 💵",
          description:
            "Mỗi lần đấu giá có phí là 150,000đ. Nếu không còn là người trả giá cao nhất, bạn sẽ không mất phí.",
          button: "Tiếp theo",
        },
        {
          title: "Điều kiện đấu giá",
          icon: "💵",
          description:
            "Lần trả giá hợp lệ phải cao hơn giá trị hiện tại một khoảng hơn hoặc bằng bước giá của sản phẩm.",
          button: "Tiếp theo",
        },
        {
          title: "Bạn đã sẵn sàng rồi!",
          icon: "🤗",
          description:
            "Chúc bạn thành công với semo! Hãy liên lạc với chúng tôi nếu có thắc mắc gì.",
          button: "Trả giá ngay!",
        },
      ],
      // modal attrs
      isFirstModal: false,
      isBiddingModal: false,
      isSuccessModal: false,
      amount: "",
      // error
      error: false,
      error_msg: "",
      // bidders table data
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
      // data for page
      // fruit
      fruit: {
        id: 0,
        title: "",
        icon_url: "",
      },
      // auction host
      user: {},
      // auction info
      auction: {},
      // product media
      media: [],
      // bidders
      bids: [],
      // similar products
      similar: [],
    };
  },
};
</script>

<style scoped>
.table {
  background-color: #ffffff00;
}

.card {
  border-radius: 10px;
  overflow-x: hidden;
  width: 640px;
  padding: 40px;
  margin: 0 auto;
}

.instruction-container {
  background-color: #ffffff;
  background-image: url("../assets/BG.png");
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
}

.carousel {
  height: 100%;
  width: 100%;
}

/* .cell-title {
  word-wrap: break-word;
  padding-left: 40px;
  padding-right: 40px;
  font-weight: 700;
} */
</style>