<template>
    <div class="eee">
      <input type="number" v-model='count'>
      <input type="checkbox" v-model='show'>
        <Table :height='300' :fixed='false'>
            <thead slot='thead'>
                <tr>
                  <th colspan="3">序号</th>

                  <th>主石数/重</th>
                  <th>辅石数/重</th>
                  <th>成本</th>
                  <th v-show='show'>销售价</th>
                  <th v-show='show'>仓位</th>
                  <th v-show='show'>件重</th>
                  <th v-show='show'>金重</th>
                  <th>品牌</th>
                  <th>库龄</th>
                  <th>创建时间</th>
                  <th colspan="2">状态</th>
                  <!-- <th>操作</th> -->
                </tr>
            </thead>
            <tbody slot='tbody'>
                <tr v-for='(item, key) in list'
                :key='key'>
                <td th='序号'
                  @click='del(key)'>{{key + 1}}</td>
                <td th='商品' style="width: 120px">
                  条码：{{item.goods_bar}}
                  <br v-if='key === 3'>re
                </td>
                <td th='类别'>{{item.classe_name}}</td>
                <td th='主石数/重'>
                  {{item.goods_stone_number}}/{{item.goods_stone_weight}}</td>
                <td th='辅石数/重'>
                  {{item.goods_vstone_number}}/{{item.goods_vstone_weight}}</td>
                <td th='成本'>
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
                   style="width: 200px"><span>编辑</span>　删除</td>
              </tr>
            </tbody>
            <tfoot slot='tfoot'>
                <tr v-for='(item, key) in 2'
                :key='key'>
                <td>总计</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td v-show='show'>6</td>
                <td v-show='show'>7</td>
                <td v-show='show'>8</td>
                <td v-show='show'>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
              </tr>
            </tfoot>
        </Table>
        <table class="table" style="margin-top: 30px;">
          <thead>
            <tr>
                <th colspan="3" rowspan="2">序号</th>
                <th>主石数/重</th>
                <th>辅石数/重</th>
                <th>成本</th>
                <th>销售价</th>
                <th>仓位</th>
                <th>件重</th>
                <th>金重</th>
                <th>品牌</th>
                <th>库龄</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr>
                <th>主石数/重</th>
                <th>辅石数/重</th>
                <th>成本</th>
                <th>销售价</th>
                <th>仓位</th>
                <th>件重</th>
                <th>金重</th>
                <th>品牌</th>
                <th>库龄</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for = '(item, key) in 6' :key='key'>
                  <td colspan="3">序号</td>
                  <td>商品</td>
                  <td>类别</td>
                  <td>主石数/重</td>
                  <td>辅石数/重</td>
                  <td>成本</td>
                  <td>销售价</td>
                  <td>仓位</td>
                  <td>件重</td>
                  <td>金重</td>
                  <td>品牌</td>
                  <td>库龄</td>
                  <td>创建时间</td>
                  <td>状态</td>
                  <td>操作</td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td colspan="5">序号</td>
                  <td>商品</td>
                  <td>类别</td>
                  <td>主石数/重</td>
                  <td>辅石数/重</td>
                  <td>成本</td>
                  <td>销售价</td>
                  <td>仓位</td>
                  <td>件重</td>
                  <td>金重</td>
                  <td>品牌</td>
                  <td>库龄</td>
                  <td>创建时间</td>
                  <td>状态</td>
                  <td>操作</td>
              </tr>
          </tfoot>
        </table>
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
    methods: {
      del(k) {
        console.log(k)
      }
    },
    components: {Table},
  }
  </script>
  
  <style lang="less">
    #app{
      width: 60%;
      margin: 100px auto
    }
  </style>
  