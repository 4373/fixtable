<template>
  <div id="app">
      <TableLayout></TableLayout>
  </div>
</template>

<script>
// import TableLayout from './tablelayout/index'
import TableLayout from './component/box'
// import TableLayout from './colgroup/index'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {TableLayout},
}
</script>

<style lang="less">
  @import url('./metarial-table.less');
  #app{
    width: 80%;
    margin: 100px auto
  }
</style>
