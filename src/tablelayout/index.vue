<style lang="less">
  @import url('./index.less');
  .table-header,
  .table-footer {
    overflow: hidden;
  }

  .table {
    table-layout: fixed;
  }

  .table th,
  .table td {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .table-box thead,
  .table-box tfoot {
    display: none
  }
  .box{
    position: relative;
    border: 1px solid #eee;
     border-radius: 10px;
  }
  .left-box{
    position: absolute;
    left: 0;
    top: 0;
    width: 125.6px;
    z-index: 6;
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .left-box-box{
    overflow: hidden;
  }

</style>
<template>
  <div>
    <input type="number"
      v-model='col'>

      <div class="table-box"
        v-fixed>
        <table class="table table-striped table-hover">
          <thead class="thead">
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
          <tbody class="tbody">
            <tr v-for='(item, key) in list'
              :key='key'>
              <td th='序号'
                class="fixed-left">{{key + 1}}</td>
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
              <td th='操作'
                class="fixed-right">编辑　删除</td>
            </tr>
          </tbody>
          <tfoot class="tfoot">
            <tr v-for='(item, key) in 2'
              :key='key'>
              <td class="fixed-left">总计</td>
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
  import { Both } from './both.js'

  export default {
    directives: {
      fixed: {
        inserted(el) {
          const box = document.createElement('div')
          box.setAttribute('class', 'box')
          
          el.parentElement.insertBefore(box, el)
          box.appendChild(el)

         
          // 固定表头
          const header = document.createElement('div')
          header.setAttribute('class', 'table-header')
          let table = document.createElement('table')
          table.setAttribute('class', 'table')
          table.appendChild(el.querySelector('.thead').cloneNode(true))
          header.appendChild(table)
          
          // 固定表尾
          const footer = document.createElement('div')
          footer.setAttribute('class', 'table-footer')
          table = document.createElement('table')
          table.setAttribute('class', 'table')
          table.appendChild(el.querySelector('.tfoot').cloneNode(true))
          footer.appendChild(table)

          box.insertBefore(header, el)
          box.appendChild(footer)

          // 固定左
          Both(box)
          
          let leftscroll = 0
          let topscroll = 0

          const out_header = document.querySelector('.table-header').querySelector('.table')
          const out_footer =document.querySelector('.table-footer').querySelector('.table')
          const out_left = document.querySelector('.left-box-box').querySelector('.table')

          el.addEventListener('scroll', (e) => {
            if(el.scrollLeft !== leftscroll) {
              leftscroll = el.scrollLeft
              out_header.style.transform = `translateX(-${el.scrollLeft}px)`
              out_footer.style.transform = `translateX(-${el.scrollLeft}px)`
            }
            if(el.scrollTop !== topscroll) {
              topscroll = el.scrollTop
              out_left.style.transform = `translateY(-${el.scrollTop}px)`
            }
          })
        },
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
