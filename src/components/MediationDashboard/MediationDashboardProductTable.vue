<template>
  <section class="dashboard-wrap">
    <!-- <div class="pagination">
      <p class="post-infor">📰 Hiển thị 1-6 trên 10 bài đăng</p>
      <div class="paging">
        <p class="page-back">👈 Trang trước</p>
        <p class="page-next">Trang sau 👉</p>
      </div>
    </div> -->
      <b-table
      :data="products"
      :checked-rows.sync="checkedRows"
      paginated
      pagination-simple
      hoverable
      per-page="20"
      >
      
        <template slot-scope="product">
          <tr class="table-row" v-bind:product_id="product.row.id" v-on:click="redirectToCencorProductMediation(product.row.id)">
            <td style="width: 10%" :id="product.row.id">{{product.row.id}}</td>
            <td  style="width: 20%">{{product.row.title}}</td>
            <td class="table-column">{{product.row.sort_of_fruit}}</td>
            <td class="table-column">{{product.row.name}}</td>
            <td class="table-column">{{product.row.date_created}}</td>
            <td class="table-column">{{product.row.product_status}}</td>
            <td  style="width: 10%"><input type="checkbox"/></td>
          </tr>
        </template>
        
        <template slot="bottom-left">
          <b>Total checked</b>
          : {{ checkedRows.length }}
          <b-button @click="deleteAlert" type="is-text">🗑️ Xóa bài đăng</b-button>
          <b-modal>
            <MediationDashboardDelete />
          </b-modal>
          <button class="button field is-danger" @click="checkedRows = []"
                :disabled="!checkedRows.length">
                <b-icon icon="close"></b-icon>
                <span>Clear checked</span>
            </button>
        </template>    
      </b-table>
  </section>
</template>
<script>
import MediationDashboardDelete from "./MediationDashboardDelete.vue";
export default {
  components: {
    MediationDashboardDelete,
  },
  created: function () {
    this.getAllProducts();
  },
  methods: {
    deleteAlert(){
       this.$buefy.modal.open({
         parent: this,
         component: MediationDashboardDelete,
         hasModalCard: true,
         trapFocus: true
       })
    }

    ,getAllProducts(){
      console.log('Access getAllProducts in file Admindashboarddeal.vue')
      fetch(`http://localhost:3003/admin/`)
      .then((response)=> response.json())
      .then((json)=>{
         if (Object.keys(json).length == 0) {
           console.log('No product get from db')
         }else{
           let this_ = this
           console.log('The number of users is: ' + Object.keys(json).length)
           this_.products = [{}]
           this_.products = this.getProduct(json)
           console.log("New this.products array after use map function: " + this_.products.length)
         }
      })
    }

    ,redirectToCencorProductMediation(p_id){
      console.log("access redirectToCencorProductMediation, p_id = "+p_id)
      // window.location.href = "/cencorproductmediation/"
      this.$router.push({
        name: 'CencorProductMediation',
        params: {
          product_id: p_id
        }
      })
    }

    ,getProduct(userObject){
        var id, title, sort_of_fruit, name, date_created, product_status;
        var productList = [{}];
        var product = {}
        for(var j = 0; j<userObject.length; j++){
            id = userObject[j].id;
            title = userObject[j].title;
            sort_of_fruit = userObject[j].Fruit.title;
            name = userObject[j].User.name;
            date_created = userObject[j].date_created
            switch(userObject[j].product_status){
              case 0:
                product_status = 'Trượt kiểm duyệt';
                break;
              case 1:
                product_status = 'Chờ kiểm duyệt';
                break;
              case 2:
                product_status = 'Đã kiểm duyệt';
                break;
              case 3:
                product_status = 'Đang được đấu giá';
                break;
              case 4:
                product_status = 'Đang giao kèo';
                break;
              case 5:
                product_status = 'Đã bán';
                break;
              case 9:
                product_status = 'Lưu trữ';
                break;
          }
            
            product = {id: id, title: title, sort_of_fruit: sort_of_fruit, name: name, date_created: date_created, product_status: product_status};
            productList.push(product);
        }
        delete productList[0]
        return productList;
    }
    
  },
  data() {
    const data = [
      {
        
      }
    ];

    return {
      data,
      products: Object,
      users: Object,
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true,
          searchable: true
        },
        {
          field: "title",
          label: "TÊN SẢN PHẨM",
          searchable: true
        },
        {
          //field: "fruit",
          field: "sort_of_fruit",
          label: "LOẠI QUẢ",
          searchable: true
        },
        {
          field: "name",
          label: "NGƯỜI ĐĂNG",
          searchable: true
        },
        {
          field: "date_created",
          label: "THƠI GIAN ĐĂNG",
          centered: true,
          searchable: true
        },
        {
          field: "product_status",
          label: "TRẠNG THÁI",
          searchable: true
        }
      ]
    };
  }
};
</script>
<style scoped>
.dashboard-wrap {
  width: 1166px;
}
.pagination {
  display: flex;
  justify-content: space-between;
}
.paging {
  display: flex;
  justify-content: space-between;
}
.page-back {
  padding-right: 15px;
}
.page-next {
  margin-right: 20px;
}
.dashboard-table {
  font-family: Roboto;
  font-size: 12px;
  color: #212121;
}
.post-infor {
  font-family: "Roboto";
  font-weight: 500;
  font-size: 17px;
  color: #707070;
  padding-left: 3px;
}
.table-row{
  width: 100%;
}
.table-column{
  width: 15%;
  border-bottom: 1px solid black;
}
tr{
  border: 1px solid #333
}
</style>