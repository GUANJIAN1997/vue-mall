<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price<svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'}" @click="priceChecked='all'">All</a>
              </dd>
              <dd v-for="(price,index) of priceFilter" :key="index">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) of goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!---->
    <Model :mdShow="mdShow" @close="closeModel">
      <p slot="message">
        请先登陆否则无法加入购物车中！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="closeModel">关闭</a>
      </div>
    </Model>
    <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
<!---->
    <Model :mdShow="mdShowCart" @close="closeModel">
      <p slot="message">
        加入购物车成功
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="closeModel">继续购物</a>
        <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </Model>
    <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
<!--    -->
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
import NavBread from './../components/NavBread'
import Model from './../components/Model'
import axios from 'axios'
export default{
  data () {
    return {
      goodsList: [],
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '2000.00'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overlayFlag: false,
      sortFlag: true,
      page: 1,
      pageSize: 8,
      busy: true,
      loading: false,
      mdShow: false,
      mdShowCart: false
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Model
  },
  methods: {
    getGoodsList (flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.loading = true
      axios.get('/goods/list', {params: param})
        .then((result) => {
          let res = result.data
          this.loading = false
          if (res.status === '0') {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list)
              if (res.result.count === 0) {
                this.busy = true
              } else {
                this.busy = false
              }
            } else {
              this.goodsList = res.result.list
              this.busy = false
            }
          } else {
            this.goodsList = []
          }
        })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodsList()
    },
    showFilterPop () {
      this.filterBy = true
      this.overlayFlag = true
    },
    closePop () {
      this.filterBy = false
      this.overlayFlag = false
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.page = 1
      this.closePop()
      this.getGoodsList()
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 500)
    },
    addCart (productId) {
      axios.post('/goods/addCart', {productId: productId}).then((res) => {
        if (res.data.status === '0') {
          this.mdShowCart = true
          this.$store.commit('updateCartCount',1)
        } else {
          this.mdShow = true
        }
      })
    },
    closeModel () {
      this.mdShow = false
      this.mdShowCart = false
    }
  },
  mounted () {
    this.getGoodsList()
  }
}
</script>
