<template>
    <div id="selectarea" :class="fixedArea?'isFixed':''">
      <slot></slot>
    </div>
</template>
<script>

export default {
  data () {
    return {
      fixedArea: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
  },
  watch: {
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('#selectarea').offsetTop
      if (scrollTop > offsetTop) {
        this.fixedArea = true
      } else {
        this.fixedArea = false
      }
    }
  },
  created () {
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
  .isFixed{
		position: fixed;
		background-color: #Fff;
		top: 100px;
		z-index: 99999;
    right: 20px;
		width: calc(100% - 200px);
  }
</style>
