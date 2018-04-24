<template>
    <div class="eee">
      <input type="text" v-model='count'>
        <Table :height='300'>
            <thead class="thead" slot='thead'>
                <tr>
                  <th class="fixed-left">序号</th>
                  <th @click='count = count + 20'>商品</th>
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
            <tbody slot='tbody'>
                <tr v-for='(item, key) in list'
                :key='key'>
                <td th='序号'
                  class="fixed-left">{{key + 1}}</td>
                <td th='商品'  style="width: 300px">
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
            <tfoot slot='tfoot'>
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
        </Table>
    </div>
  </template>
  
  <script>
  import { goods } from '../data.js'
  import Table from './index'
  export default {
    name: 'box',
    data () {
      return {
        count: 50,
        show: true
      }
    },
    computed: {
      list() {
        let b = JSON.parse(JSON.stringify(goods[0]))
        let list = []
        for (let i = 0; i < this.count; i++) {
          list.push(b)
        }
        return list
      }
    },
    components: {Table},
  }
  </script>
  
  <style lang="less">
    #app{
      width: 80%;
      margin: 100px auto
    }
  </style>
  