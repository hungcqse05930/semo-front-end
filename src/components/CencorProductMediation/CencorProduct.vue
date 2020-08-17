<template>
  <nav class="title-bar-container">
    <form id="ReviewProductForm" method="POST">
      <div id="title-bar-content">
        <p class="info">Thông tin chung về sản phẩm</p>

        <div class="div1">
          <p class="smalltext" :class="{'edited': fruit}">Đây là quả gì?*</p>
          <div class="choosefood">
            <input type="checkbox" id="checkbox" v-model="checked" />
            <label for="checkbox">{{ search.checked }}</label>
            <!-- <input type="text" name="product_id" v-model="product_id" style="display: none;" /> -->
            <!-- <input
              type="text"
              name="admin_id"
              v-bind:value="$store.state.user.id"
              style="display: none;"
            /> -->
          </div>
          <b-field>
            <b-input
              v-model="fruit_title"
              name="fruit_title"
              placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"
            ></b-input>
          </b-field>
        </div>

        <div class="div2">
          <p class="smalltext">Sản phẩm của bạn đã sẵn sàng để tiêu thụ chưa?*</p>
          <p class="choosefood" v-if="product.product_type == 2">Chưa sẵn sàng</p>
          <p class="choosefood" v-else>Sẵn sàng</p>
        </div>

        <div class="div1">
          <p class="smalltext">Khối lượng của sản phẩm là bao nhiêu?*</p>
          <div class="choosefood">
            <p>{{product.weight}} Tấn</p>
          </div>
          <b-field>
            <b-input v-model="weight" name="weight" placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"></b-input>
          </b-field>
        </div>

        <div class="div1">
          <p class="smalltext">Địa điểm thu hoạch sản phẩm này ở đâu?*</p>
          <div class="choosefood">
            <p>{{product.Address.address +', ' + product.Address.ward +', ' + product.Address.district +', ' + product.Address.province}}</p>
          </div>
          <b-field>
            <!-- todo -->
            <b-input placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"></b-input>
          </b-field>
        </div>

        <p class="info1">Thông tin chi tiết về sản phẩm</p>

        <div class="div1">
          <p class="smalltext">Khối lượng quả chiếm bao nhiêu phần trăm trong sản phẩm này?</p>
          <div class="choosefood">
            <p>{{product.fruit_pct}} %</p>
          </div>
          <b-field>
            <b-input
              v-model="fruit_pct"
              name="fruit_pct"
              placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"
            ></b-input>
          </b-field>
        </div>

        <div class="div1">
          <p class="smalltext">Nồng độ đường trung bình của quả là bao nhiêu phần trăm?</p>
          <div class="choosefood">
            <p>{{product.sugar_pct}} %</p>
          </div>
          <b-field>
            <b-input
              v-model="sugar_pct"
              name="sugar_pct"
              placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"
            ></b-input>
          </b-field>
        </div>

        <div class="div1">
          <p class="smalltext">Cân nặng trung bình của sản phẩm là bao nhiêu?</p>
          <div class="choosefood">
            <p>{{product.weight_avg}} Kg</p>
          </div>
          <b-field>
            <b-input
              v-model="weight_avg"
              name="weight_avg"
              placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"
            ></b-input>
          </b-field>
        </div>

        <div class="div1">
          <p class="smalltext">Đường kính trung bình của sản phẩm là bao nhiêu?</p>
          <div class="choosefood">
            <p>{{product.diameter_avg}} cm</p>
          </div>
          <b-field>
            <b-input
              v-model="diameter_avg"
              name="diameter_avg"
              placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"
            ></b-input>
          </b-field>
        </div>

        <div class="div3">
          <p class="smalltext">Hãy cho người mua biết thêm về sản phẩm của bạn*</p>
          <div class="choosefood">
            <p>{{product.notes}}</p>
          </div>
          <b-field>
            <b-input v-model="notes" name="notes" placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"></b-input>
          </b-field>
        </div>

        <p class="info1">Sản phẩm của bạn trông thế nào?</p>
        <form
          ref="admin-review-form"
          id="cencor_product_div_img_form"
          method="post"
          action="http://localhost:3003/admin/reviewMedia"
        >
          <div class="div4">
            <div class="divimg">
              <div class="accuracies">
                <CencorProductDivImg
                  class="accuracy-item"
                  v-bind:accuracy="accuracy"
                  v-for="accuracy in accuracies"
                  v-bind:key="accuracy.id"
                />
              </div>
            </div>
          </div>
        </form>
        <p class="info1">Hãy định giá cho sản phẩm của bạn</p>

        <div class="div1">
          <p class="smalltext">Giá khởi điểm cho sản phẩm này là bao nhiêu?*</p>
          <div class="choosefood">
            <p>{{product.price_init}}đ</p>
          </div>
          <b-field>
            <b-input
              name="price_init"
              v-model="price_init"
              placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"
            ></b-input>
          </b-field>
        </div>

        <div class="div1">
          <p class="smalltext">Bước giá cho mỗi lần trả giá bạn muốn đặt là bao nhiêu?*</p>
          <div class="choosefood">
            <p>{{product.price_step}}đ</p>
          </div>
          <b-field>
            <b-input
              name="price_step"
              v-model="price_step"
              placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"
            ></b-input>
          </b-field>
        </div>

        <p class="info1">Hãy cho sản phẩm của bạn một cái tên</p>

        <div class="div1">
          <p class="smalltext">Bạn muốn đặt tên sản phẩm này là gì?*</p>
          <div class="choosefood">
            <p>{{product.title}}</p>
          </div>
          <b-field>
            <b-input name="title" v-model="title" placeholder="Nếu không hợp lý, hãy ghi chú cho người bán biết"></b-input>
          </b-field>
        </div>

        <div class="buttons">
          <!-- <b-button type="is-success">Gửi kiểm định</b-button> -->
          <input class="btn-submit" v-on:click="adminReview()" value="Gửi kiểm định" />
        </div>
      </div>
    </form>
  </nav>
</template>

<script>
import axios from "axios";
import CencorProductDivImg from "../../components/CencorProductMediation/CencorProductDivImg.vue";
export default {
  name: "PageTitleBar",
  components: {
    CencorProductDivImg,
  },
  props: ["product_id_cencor"],
  created: function () {
    this.getProductById();
  },
  methods: {
    getProductById() {
      console.log("Access function getProductById");
      fetch(
        `http://localhost:3003/admin/review/${sessionStorage.getItem(
          "product_id_cencor_session"
        )}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (Object.keys(json).length == 0) {
            console.log("No product get from db");
          } else {
            let this_ = this;
            this_.product = json[0];
            console.log("Get product by id success, product is: ");
            console.dir(this_.product);
            //Assign data to variable
            this_.search.checked = this_.product.Fruit.title;
            var jsonArr = [{}];
            for (var i = 0; i < this_.product.ProductMedia.length; i++) {
              var pro_media = this_.product.ProductMedia[i];
              var temp = {};
              temp.id = pro_media.id;
              temp.title = pro_media.notes;
              var splitStr = pro_media.media_url.split("/");
              temp.number = splitStr[splitStr.length - 1];
              temp.textnumber = i + 1;
              jsonArr.push(temp);
            }
            jsonArr.shift();
            this_.accuracies = jsonArr;
          }
        });
    },
    async adminReview() {
      const notes = this.accuracies
        .filter((accuracy) => Boolean(accuracy.notes))
        .map((accuracy) => {
          return {
            accuracyId: accuracy.id,
            notes: accuracy.notes,
          };
        });

      const createNotePromises = notes.map((note) =>
        axios.post(`/admin/reviewMedia`, {
          id: note.accuracyId,
          notes: note.notes,
        })
      );

      await Promise.all(createNotePromises);

      // TODO: Study about ref in Vue...!
      await axios.post(`/admin/reviewProduct`, {
        notes: this.notes,
        weight: this.weight,
        price_step: this.price_step,
        fruit_title: this.fruit_title,
        product_id: this.product_id_cencor,
        admin_id: this.$store.state.user.id,
        title: this.title,
        fruit_pct: this.fruit_pct,
        weight_avg: this.weight_avg,
        diameter_avg: this.diameter_avg,
        price_init: this.price_init
      })
    },
  },
  data() {
    return {
      fruit: "",
      product: Object,
      search: {
        checked: " TÁO AMBROSIA",
      },
      accuracies: [
        {
          id: 1,
          title: "Ảnh",
          number: "?????????????pg",
          textnumber: "1",
        },
        {
          id: 1,
          title: "Ảnh",
          number: "IMG_20200405_142942.jpg",
          textnumber: "2",
        },
        {
          id: 1,
          title: "Ảnh",
          number: "IMG_20200405_142942.jpg",
          textnumber: "3",
        },
        {
          id: 1,
          title: "Ảnh",
          number: "IMG_20200405_142942.jpg",
          textnumber: "4",
        },
        {
          id: 1,
          title: "Ảnh",
          number: "IMG_20200405_142942.jpg",
          textnumber: "5",
        },
        {
          id: 1,
          title: "Ảnh",
          number: "IMG_20200405_142942.jpg",
          textnumber: "6",
        },
      ],
    };
  },
};
</script>

<style scoped>
.title-bar-container {
  width: 600px;
  height: 3000px;
  top: 0;
  /* position: sticky; */
  z-index: 1;
  background: white;
  backdrop-filter: saturate(180%) blur(24px);
  /* border: 1px solid #00000015; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
}
#title-bar-content {
  float: left;
}
.div1 {
  margin-top: 25px;
  width: 600px;
  height: 126px;
}
.div2 {
  margin-top: 25px;
  width: 600px;
  height: 62px;
}
.div3 {
  margin-top: 25px;
  width: 600px;
  height: 198px;
}
.div4 {
  margin-top: 25px;
  width: 600px;
  display: inline-block;
}
.divimg {
  height: 104px;
  width: 600px;
  display: contents;
}
.info {
  font-family: "Merriweather";
  font-weight: 700;
  font-size: 28px;
  color: #01d28e;
}
.info1 {
  margin-top: 60px;
  font-family: "Merriweather";
  font-weight: 700;
  font-size: 28px;
  color: #01d28e;
}
.smalltext {
  font-family: "Roboto";
  font-weight: 400;
  font-size: 18px;
  color: #686868;
}
.edited {
  color: #fd5f55 !important;
}
.choosefood {
  margin-top: 6px;
  margin-bottom: 10px;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 20px;
  color: #01d28e;
}
.button {
  margin-left: auto;
  margin-right: auto;
}
.accuracies {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: minmax(-100px, auto);
  margin-top: 24px;
}
.btn-submit {
  background-color: #23d160;
  border-color: transparent;
  color: #fff;
  width: 126px;
  height: 36px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
}
</style>