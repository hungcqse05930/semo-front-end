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
      class="dashboard-table"
      :data="products"
      :checked-rows.sync="checkedRows"
      checkable
      checkbox-position="right"
      paginated
      pagination-simple
      hoverable
      per-page="20"
      >
        <template slot-scope="props">
          <template v-for="column in columns">
            <b-table-column :key="column.id" v-bind="column"
             onclick="window.location.href='/cencorproductmediation'">
              <template
                v-if="column.searchable && !column.numeric"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Search..."
                  size="is-small"
                />
              </template>
              {{ props.row[column.field] }}
            </b-table-column>
          </template>
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
        
           ////Declare value for products variable
           //this.products = [{}]
           //for(var i = 0; i< Object.keys(json).length; i++){
             //for(var j = 0; j< Object.keys(json[i].Products).length; j++){
                //this.products.push(json[i].Products[j])
             //}
           //}
           //delete this.products[0]//Delete initial data which has value is null
           
           //console.log(this.products[1].Fruit.title)
         }
      })
    }

    ,getProduct(userObject){
        var id, title, sort_of_fruit, name, date_created, product_status;
        var productList = [{}];
        var product = {}
        for(var j = 0; j<userObject.length; j++){
          var user = userObject[j];
          for(var i = 0; i<user.Products.length; i++){
            id = user.Products[i].id;
            title = user.Products[i].title;
            sort_of_fruit = user.Products[i].Fruit.title;
            name = user.name;
            date_created = user.Products[i].date_created
            if(user.Products[i].product_status == 0){
              product_status = 'trượt kiểm duyệt';
            }else if(user.Products[i].product_status == 1){
              product_status = 'chờ kiểm duyệt';
            }else if(user.Products[i].product_status == 2){
              product_status = 'đã kiểm duyệt';
            }else if(user.Products[i].product_status == 3){
              product_status = 'đang được đấu giá';
            }else if(user.Products[i].product_status == 4){
              product_status = 'đang giao kèo';
            }else if(user.Products[i].product_status == 5){
              product_status =  'đã bán';
            }else if(user.Products[i].product_status == 9){
              product_status =  'lưu trữ';
            }
            product = {id: id, title: title, sort_of_fruit: sort_of_fruit, name: name, date_created: date_created, product_status: product_status};
            productList.push(product);
          }
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
</style>