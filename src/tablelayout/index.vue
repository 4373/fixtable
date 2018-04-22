<style lang="less"
  scoped>
  @import url('./index.less');

  .table {
    /* table-layout: fixed; */
  }
  .table th,
  .table td {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  th.fixed-right,th.fixed-left{
    z-index: 7;
  }
  .fixed-right,.fixed-left{
    background: white;
    z-index: 6;
  }

  .table thead th, .table tfoot td{
    position: relative!important;
  }



</style>
<template>
  <div>
    <input type="number"
      v-model='col'>
    <div class="table-box" v-fixed>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th class="fixed-left">序号</th>
            <th>商品</th>
            <th>类别</th>
            <th v-show='show'>主石数/重</th>
            <th v-show='show'>辅石数/重</th>
            <th v-show='show'>成本</th>
            <th v-show='show'>销售价</th>
            <th v-show='show'>仓位</th>
            <th v-show='show'>件重</th>
            <th v-show='show'>金重</th>
            <th>品牌</th>
            <th>库龄</th>
            <th>创建时间</th>
            <th>状态</th>
            <th class="fixed-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(item, key) in list'
            :key='key'>
            <td th='序号'  class="fixed-left">{{key + 1}}</td>
            <td th='商品'>
              条码：{{item.goods_bar}}
            </td>
            <td th='类别'>{{item.classe_name}}</td>
            <td th='主石数/重'
              v-show='show'>
              {{item.goods_stone_number}}/{{item.goods_stone_weight}}</td>
            <td th='辅石数/重'
              v-show='show'>
              {{item.goods_vstone_number}}/{{item.goods_vstone_weight}}</td>
            <td th='成本'
              v-show='show'>
              {{item.goods_cost}}
            </td>
            <td th='销售价'
              v-show='show'>
              {{item.goods_sale_price}}
            </td>
            <td th='仓位'
              v-show='show'>
              {{item.depot_name}}
            </td>
            <td th='件重'
              v-show='show'>
              {{item.goods_weight}}
            </td>
            <td th='金重'
              v-show='show'>
              {{item.goods_gold_weight}}
            </td>
            <td th='品牌'>
              {{item.brand_name}}
            </td>
            <td th='库龄'>
              {{item.goods_period}}
            </td>
            <td th='创建时间'>
              {{item.create_time}}
            </td>
            <td th='状态'>{{item.goods_state}}</td>
            <td th='操作' class="fixed-right">编辑　删除</td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-for='(item, key) in 1'
            :key='key'>
            <td  class="fixed-left">总计</td>
            <td>1</td>
            <td>2</td>
            <td v-show='show'>3</td>
            <td v-show='show'>4</td>
            <td v-show='show'>5</td>
            <td v-show='show'>6</td>
            <td v-show='show'>7</td>
            <td v-show='show'>8</td>
            <td v-show='show'>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td class="fixed-right">14</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  import { goods } from '../data.js'
  let box,table,head,body,foot,thead_ths,tfoot_tds,rows,fixed_left,h, w, fixed_right, scrollwidth = 6
  function rowscroll(top, bottom) {
      // 固定表头'
      for (let j = 0; j < thead_ths.length; j++) {
        thead_ths[j].style.top = top
      }
      for (let j = 0; j < tfoot_tds.length; j++) {
        tfoot_tds[j].style.top = bottom
      }
  }
  function colscroll(left, right) {
    // 固定首尾列
    for(let i = 0; i < fixed_left.length; i++) {
      fixed_left[i].style.transform = left
      fixed_right[i].style.transform = right
    }
  }

  export default {
    directives: {
      fixed: {
        inserted(el) {
          
          box = el
          table = box.querySelector('.table')
          head = box.getElementsByTagName('thead')[0]
          body = box.getElementsByTagName('tbody')[0]
          foot = box.getElementsByTagName('tfoot')[0]
          rows = head.getElementsByTagName('tr')[0].getElementsByTagName('th').length
          
          thead_ths = head.getElementsByTagName('th')
          tfoot_tds = foot.getElementsByTagName('td')

          fixed_left = box.querySelectorAll('.fixed-left')
          fixed_right = box.querySelectorAll('.fixed-right')
          h = table.offsetHeight - box.offsetHeight
          w = table.offsetWidth - box.offsetWidth

          let scrolltop = 0
          let scrollleft = 0
          colscroll(0, `translateX(${-w}px)`)
          rowscroll(0, `-${h}px`)
          window.addEventListener('resize', () => {
            h = table.offsetHeight - box.offsetHeight
            w = table.offsetWidth - box.offsetWidth
            colscroll(0, `translateX(${-w}px)`)
            rowscroll(0, `-${h}px`) 
          })
          let scrollend = null
          box.addEventListener('scroll', (e) => {   
            clearTimeout(scrollend)
            if (box.scrollTop !== scrolltop) { // 发生了竖向滚动
              const top = `${box.scrollTop - 2}px`
              const bottom = `${-(table.offsetHeight - box.offsetHeight + scrollwidth) + box.scrollTop}px`
              scrolltop = box.scrollTop
              rowscroll(top, bottom)
              if(box.scrollTop > h) {
                rowscroll(top, 0)
              } else {
                rowscroll(top, bottom)
              }
            }
            if (box.scrollLeft !== scrollleft) { // 发生了横向滚动
              const left = `translateX(${box.scrollLeft}px)`
              const right = `translateX(${-(table.offsetWidth - box.offsetWidth + scrollwidth) + box.scrollLeft}px)`
              scrollleft = box.scrollLeft
              
              if(box.scrollLeft > w) {
                  colscroll(left, 0)    
                } else {
                  colscroll(left, right)
                }
              scrollend = setTimeout(function(e) {
              if(box.scrollLeft > w) {
                  colscroll(left, 0)    
                }
              },0)
            }
            
            
          })
        },
        componentUpdated(el) {
          el.scrollTo(0,0)
          head = box.getElementsByTagName('thead')[0]
          body = box.getElementsByTagName('tbody')[0]
          foot = box.getElementsByTagName('tfoot')[0]
          rows = head.getElementsByTagName('tr')[0].getElementsByTagName('th').length
          
          thead_ths = head.getElementsByTagName('th')
          tfoot_tds = foot.getElementsByTagName('td')

          fixed_left = box.querySelectorAll('.fixed-left')
          fixed_right = box.querySelectorAll('.fixed-right')
          h = table.offsetHeight - box.offsetHeight
          w = table.offsetWidth - box.offsetWidth
          colscroll(0, `translateX(${-w}px)`)
          rowscroll(0, `-${h}px`) 
        }
      }
    },
    name: 'app',
    data() {
      return {
        show: true,
        col: 50,
        message: ''
      }
    },
    computed: {
      list() {
        let b = JSON.parse(JSON.stringify(goods[0]))
        let list = []
        for (let i = 0; i < this.col; i++) {
          list.push(b)
        }
        return list
      }
    },
    mounted() {

    },
  }
</script>
