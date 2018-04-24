<style lang='less'>
  
  .box{
    /* box-sizing: border-box; */
    position: relative;
    border: 1px solid #eee;
     border-radius: 10px;
  }
  .box .table{
    table-layout: fixed
  }
  .head th,.foot td{
    background: #eee;
  }
  .box th, .box td{
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  .head,.body,.foot{
    width: 100%
  }
  .head, .foot{
    overflow: hidden;
  }
  .body{
    overflow: auto;
  }
</style>
<template>
  <div class="box">
    <div class="head">
      <table class="table">
        <slot name='thead'></slot>
      </table>
    </div>
    <div class="body" :style='{height: height + "px"}'>
      <table class="table table-hover table-striped">
        <slot name='tbody'></slot>
      </table>
    </div>
    <div class="foot">
      <table class="table">
        <slot name='tfoot'></slot>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      box: null,
      thead: null,
      tbody: null,
      tfoot: null,
      tbodyBox: null
    }),
    props: {
      data: Array,
      height: Number
    },
    methods: {
      sameWidth() {
        const tr_in_tbody = this.tbody.getElementsByTagName('tr')
        if(tr_in_tbody.length === 0) {
          const th_in_thead = this.thead.getElementsByTagName('tr')[0].getElementsByTagName('th')
          const td_in_tfoot = this.tfoot.getElementsByTagName('tr')[0].getElementsByTagName('td')
          for(let i = 0; i < th_in_thead.length; i++) {
            td_in_tfoot[i].style.width = Math.ceil(th_in_thead[i].offsetWidth) + 'px'
          }
        } else {
          const td_in_body = tr_in_tbody[0].getElementsByTagName('td')
          const tr_in_thead = this.thead.getElementsByTagName('tr')
          const tr_in_tfoot = this.tfoot.getElementsByTagName('tr')
          
          for(let i = 0; i < td_in_body.length; i++) {
            const width = Math.ceil(td_in_body[i].offsetWidth) + 'px'
            td_in_body[i].style.width = width
            for(let j = 0; j < tr_in_thead.length; j++) { // 循环 thead 的tr
              const th = tr_in_thead[j].getElementsByTagName('th')
              th[i].style.width = width
            }
            for(let j = 0; j < tr_in_tfoot.length; j++) { // 循环 thead 的tr
              const td = tr_in_tfoot[j].getElementsByTagName('td')
              td[i].style.width = width
            }
          } 
        }
      },
      sameScrollIn() {
        let leftscroll = 0
        let topscroll = 0
        const out_header = document.querySelector('.head').querySelector('.table')
        const out_footer =document.querySelector('.foot').querySelector('.table')
        this.tbodyBox.addEventListener('scroll', (e) => {
          if(this.tbodyBox.scrollLeft !== leftscroll) {
              leftscroll = this.tbodyBox.scrollLeft
              out_header.style.transform = `translateX(-${this.tbodyBox.scrollLeft}px)`
              out_footer.style.transform = `translateX(-${this.tbodyBox.scrollLeft}px)`
            }
            if(this.tbodyBox.scrollTop !== topscroll) {
              topscroll = this.tbodyBox.scrollTop
            }
        })
      }
    },
    mounted() {
      this.box = document.querySelector('.box')
      this.thead = document.querySelector('.head').getElementsByTagName('thead')[0]
      this.tbodyBox = document.querySelector('.body')
      this.tbody = this.tbodyBox.getElementsByTagName('tbody')[0]
      this.tfoot = document.querySelector('.foot').getElementsByTagName('tfoot')[0]
      this.sameWidth()
      this.sameScrollIn()
    }
  }
</script>