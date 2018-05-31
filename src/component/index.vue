<style scoped>
  .box {
    position: relative;
    border: 1px solid #eee;
    border-radius: 10px;
  }
  th,.foot td{
    border: 1px solid #eee
  }
  .box .table {
    table-layout: fixed;
    position: relative;
  }
  .box td:first-of-type,.box th:first-of-type{
    border-right: 2px solid #eee;
  }
  .box td:last-child,.box th:last-child{
    border-left: 3px solid #eee;
  }
  th,
  td {
    background: white;
    box-sizing: border-box;
    font-size: 12px;
  }

  .foot td{
    background: #eee
  }

  .box th,
  .box td {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .head,
  .body,
  .foot {
    width: 100%;
  }

  .head,
  .foot {
    overflow: hidden;
  }

  .body {
    overflow: auto;
  }

</style>
<template>
  <div class="box">
    <div class="head">
      <table class="table thead-table">
        <slot name='thead'></slot>
      </table>
    </div>
    <div class="body thead-body"
      :style='{height: height + "px"}'>
      <table class="table table-hover table-striped">
        <slot name='tbody'></slot>
      </table>
    </div>
    <div class="foot thead-foot">
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
      tbodyBox: null,
      boxWidth: 0,
      tableWidth: 0,
      isIE9: false
    }),
    props: {
      data: Array,
      height: Number,
      fixed: Boolean
    },
    methods: {
      sameWidth() {
        const tr_in_tbody = this.tbody.getElementsByTagName('tr')
        if (tr_in_tbody.length === 0) {
          const th_in_thead = this.thead.getElementsByTagName('tr')[0].getElementsByTagName('th')
          const td_in_tfoot = this.tfoot.getElementsByTagName('tr')[0].getElementsByTagName('td')
          const width = Math.ceil(this.boxWidth / th_in_thead.length) + 'px'
          for (let i = 0; i < th_in_thead.length; i++) {
            th_in_thead[i].style.width = width
            td_in_tfoot[i].style.width = width
          }
        } else {
          const td_in_body = tr_in_tbody[0].getElementsByTagName('td')
          const tr_in_thead = this.thead.getElementsByTagName('tr')
          const tr_in_tfoot = this.tfoot.getElementsByTagName('tr')

          for (let i = 0; i < td_in_body.length; i++) {
            const width = Math.ceil(td_in_body[i].offsetWidth) + 'px'
            td_in_body[i].style.width = width
            for (let j = 0; j < tr_in_thead.length; j++) { // 循环 thead 的tr
              const th = tr_in_thead[j].getElementsByTagName('th')
              th[i].style.width = width
            }
            for (let j = 0; j < tr_in_tfoot.length; j++) { // 循环 thead 的tr
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
        const out_footer = document.querySelector('.foot').querySelector('.table')
        this.tbodyBox.addEventListener('scroll', (e) => {
          if (this.tbodyBox.scrollLeft !== leftscroll) {
            leftscroll = this.tbodyBox.scrollLeft
            if(this.isIE9) {
              out_header.style.left = -this.tbodyBox.scrollLeft + 'px'
              out_footer.style.left = -this.tbodyBox.scrollLeft + 'px'
            } else {
              out_header.style.transform = `translateX(-${this.tbodyBox.scrollLeft}px)`
              out_footer.style.transform = `translateX(-${this.tbodyBox.scrollLeft}px)`
            }
            this.fixedBoth(this.tbodyBox.scrollLeft)
          }
        })
      },
      fixedBoth(x) {
        if(!this.fixed) return
        const rx = -(this.tableWidth - this.boxWidth + 18 - 2) + x
        const lx = x-2
        const haveScrollWidth = this.tableWidth - this.boxWidth > 10 ? 0 : 18
        const trInhead = this.thead.getElementsByTagName('tr')
        for (let i = 0; i < trInhead.length; i++) {
          const th = trInhead[i].getElementsByTagName('th')
          th[0].style.transform = `translateX(${lx}px)`
          th[th.length-1].style.transform = `translateX(${rx - haveScrollWidth}px)`
        }
        const trInFoot = this.tfoot.getElementsByTagName('tr')
        for (let i = 0; i < trInFoot.length; i++) {
          const td = trInFoot[i].getElementsByTagName('td')
          td[0].style.transform = `translateX(${lx}px)`
          td[td.length-1].style.transform = `translateX(${rx- haveScrollWidth}px)`
        }
        const trInBody = this.tbody.getElementsByTagName('tr')
        for (let i = 0; i < trInBody.length; i++) {
          const td = trInBody[i].getElementsByTagName('td')
          td[0].style.transform = `translateX(${lx}px)`
          td[td.length-1].style.transform = `translateX(${rx}px)`
        }

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
      this.boxWidth = this.box.offsetWidth
      this.tableWidth = this.tbody.offsetWidth
      this.fixedBoth(0)
      window.addEventListener('resize', () => {        
          this.boxWidth = this.box.offsetWidth
          this.tableWidth = this.tbody.offsetWidth
          this.fixedBoth(this.tbodyBox.scrollLeft)
      })
      const UA = window.navigator.userAgent.toLowerCase()
      this.isIE9 = UA && UA.indexOf('msie 9.0') > 0
      console.log(this.$slots)
    }
  }
</script>
