<template>
  <div class="container">
    <div class="title columns is-mobile">
      <div class="column is-narrow">
        <p class="list-title">
          <slot name="title"></slot>
        </p>
      </div>
      <div class="column"></div>
      <div class="nav-button column is-narrow">
        <div class="columns is-variable is-1 is-mobile">
          <div class="column">
            <b-button type="is-rounded" @click="swipeLeft">👈</b-button>
          </div>
          <div class="column">
            <b-button type="is-rounded" @click="swipeRight">👉</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="auctions-strip columns is-mobile is-1">
      <div
        id="auction-strip"
        class="auction column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-2-fullhd"
        v-for="(auction, i) in auctions"
        :key="i"
      >
        <auction-card :auction="auction"></auction-card>
      </div>
    </div>
  </div>
</template>

<script>
import AuctionCard from "./AuctionCard.vue";
export default {
  name: "AuctionCarouselList",
  props: {
    auctions: Array,
  },
  components: {
    AuctionCard,
  },
  methods: {
    /*eslint-disable */
    swipeLeft() {
      let content = document.querySelector(".auctions-strip");
      content.scrollLeft -= 600;
    },
    swipeRight() {
      let content = document.querySelector(".auctions-strip");
      content.scrollLeft += 600;
    },
  },
};
</script>
/*eslint-enable */
<style scoped>
.auctions-strip {
  margin: 0px;
  width: 100%;
  display: inline-flex;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
</style>