<style scoped>
  .box {
    position: relative;
    border: 1px solid #eee;
    border-radius: 10px;
  }

  th {
    background: #f5f5f5!important
  }

  .box .table {
    position: relative;
    /* border-collapse: collapse; */
  }



  th,
  tfoot td{
    box-sizing:border-box;
  }

  .foot td {
    background: #eee
  }

  .box th,
  .box td {
    font-size: 12px;
    font-family:Arial, Helvetica, sans-serif;
    overflow: hidden;
    /* width: 100px;
    overflow: hidden;
    text-overflow: ellipsis; */
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
  .head .table, .foot .table{
    table-layout: fixed;
  }

  .body {
    overflow: auto;
  }

</style>
<template>
  <div class="box" ref='box'>
    <div class="head" ref='headBox'>
      <table class="table thead-table" ref='head'>
        <slot name='thead'></slot>
      </table>
    </div>
    <div class="body" :style='{height: height + "px"}' ref='bodyBox'>
      <table class="table table-hover table-striped" ref='body'>
        <div v-if='$slots.tbody === undefined || $slots.tbody[0].children.length === 0' style="padding: 100px 0;text-align: center;">
          没有数据
        </div>
        <slot name='tbody'>

        </slot>
      </table>
    </div>
    <div class="foot" ref='footBox'>
      <table class="table" ref='foot'>
        <slot name='tfoot'></slot>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      isIE9: false
    }),
    props: {
      data: Array,
      height: Number,
      fixed: Boolean
    },
    methods: {
      sameWidth() {
        const trInTbody = this.$refs.body.getElementsByTagName('tr')
        if (trInTbody.length > 0) { // 
          const widthArr = [] // 自适应宽度
          const bodyTd = trInTbody[0].getElementsByTagName('td') // 一列中的所有 td
          for(let i = 0; i < bodyTd.length; i++) { // 获取自适应宽度
            widthArr.push(bodyTd[i].offsetWidth)
          }
          // 同步head宽度。处理colspan
          const headTr = this.$refs.head.getElementsByTagName('tr')
          if(headTr.length > 0) {
            const th = headTr[headTr.length - 1].getElementsByTagName('th') || []
            let step = 0
            for(let i = 0; i < th.length; i++) {
              let col = th[i].getAttribute('colspan')
              if(col !== null) {
                th[i].style.width = widthArr.slice(step, step + col).reduce((sum, item) => sum + item) + (col-1)*2 + 'px'
                step += +col
              } else {
                th[i].style.width = widthArr[step] + 'px'
                step++
              }
            }
          }
          // 同步foot宽度。处理colspan
          const footTr = this.$refs.foot.getElementsByTagName('tr')
          if(footTr.length > 0) {
            const td = footTr[0].getElementsByTagName('td') || []
            let step = 0
            for(let i = 0; i < td.length; i++) {
              let col = td[i].getAttribute('colspan')
              if(col !== null) {
                td[i].style.width = widthArr.slice(step, step + col).reduce((sum, item) => sum + item) + (col-1)*2 + 'px'
                step += +col
              } else {
                td[i].style.width = widthArr[step] + 'px'
                step++
              }
            }
          }
        }
      },
      sameScroll() {
        let leftscroll = 0
        const out_header = this.$refs.headBox.querySelector('.table')
        const out_footer = this.$refs.footBox.querySelector('.table')
        this.$refs.bodyBox.addEventListener('scroll', (e) => {
          if (this.$refs.bodyBox.scrollLeft !== leftscroll) { // 仅横向滚动
            leftscroll = this.$refs.bodyBox.scrollLeft
            if (this.isIE9) {
              out_header.style.left = -leftscroll + 'px'
              out_footer.style.left = -leftscroll + 'px'
            } else {
              out_header.style.transform = `translateX(-${leftscroll}px)`
              out_footer.style.transform = `translateX(-${leftscroll}px)`
            }
            this.fixedBoth(leftscroll)
          }
        })
      },
      fixedBoth(x) {
        if (!this.fixed) return
        const rx = -(this.tableWidth - this.boxWidth + 18 - 2) + x
        const lx = x - 2
        const haveScrollWidth = this.tableWidth - this.boxWidth > 10 ? 0 : 18
        const trInhead = this.thead.getElementsByTagName('tr')
        for (let i = 0; i < trInhead.length; i++) {
          const th = trInhead[i].getElementsByTagName('th')
          th[0].style.transform = `translateX(${lx}px)`
          th[th.length - 1].style.transform = `translateX(${rx - haveScrollWidth}px)`
        }
        const trInFoot = this.tfoot.getElementsByTagName('tr')
        for (let i = 0; i < trInFoot.length; i++) {
          const td = trInFoot[i].getElementsByTagName('td')
          td[0].style.transform = `translateX(${lx}px)`
          td[td.length - 1].style.transform = `translateX(${rx - haveScrollWidth}px)`
        }
        const trInBody = this.tbody.getElementsByTagName('tr')
        for (let i = 0; i < trInBody.length; i++) {
          const td = trInBody[i].getElementsByTagName('td')
          td[0].style.transform = `translateX(${lx}px)`
          td[td.length - 1].style.transform = `translateX(${rx}px)`
        }

      }
    },
    updated() {
      this.sameWidth()
      this.sameScroll()
    },
    mounted() {

      this.sameWidth()
      this.sameScroll()

      this.fixedBoth(0)
      window.addEventListener('resize', () => {
        this.sameWidth()
        this.sameScroll()
      })
      const UA = window.navigator.userAgent.toLowerCase()
      this.isIE9 = UA && UA.indexOf('msie 9.0') > 0
    }
  }
</script>
