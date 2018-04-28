<style lang='less'>
  .box {
    position: relative;
    border: 1px solid #eee;
    border-radius: 10px;
  }
  th,.foot td{
    border: 1px solid #eee
  }
  .box .table {
    table-layout: fixed
  }
  .box td:first-of-type,.box th:first-of-type{
    box-shadow: 6px 0px 4px -4px rgba(0, 0, 0, 0.1);
  }
  .box td:last-child,.box th:last-child{
    box-shadow: -6px 0px 4px -4px rgba(0, 0, 0, 0.1);
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
    width: 100%
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
      <table class="table">
        <slot name='thead'></slot>
      </table>
    </div>
    <div class="body"
      :style='{height: height + "px"}'>
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
      tbodyBox: null,
      boxWidth: 0,
      tableWidth: 0
    }),
    props: {
      data: Array,
      height: Number
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
            out_header.style.transform = `translateX(-${this.tbodyBox.scrollLeft}px)`
            out_footer.style.transform = `translateX(-${this.tbodyBox.scrollLeft}px)`
            this.fixed(this.tbodyBox.scrollLeft)
          }
        })
      },
      fixed(x) {
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
      this.fixed(0)
      let timer = null
      window.addEventListener('resize', () => {
        clearTimeout(timer)
        
        timer = setTimeout(() => {
          // this.sameWidth()
        }, 100)
        
          this.boxWidth = this.box.offsetWidth
          this.tableWidth = this.tbody.offsetWidth
          this.fixed(this.tbodyBox.scrollLeft)
      })
      
    }
  }
</script>
