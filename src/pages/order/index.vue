<template>
  <div class="container">
    <div class="header">我的订单</div>
    <van-tabs v-model:active="active" @change="onClickTab">
      <van-tab title="全部" name="0"></van-tab>
      <van-tab title="待支付" name="1"></van-tab>
      <van-tab title="待服务" name="2"></van-tab>
      <van-tab title="已完成" name="3"></van-tab>
      <van-tab title="已取消" name="4"></van-tab>
    </van-tabs>
    <van-row v-for="item in orderList" :key="out_trade_no" @click="goDetail(item.out_trade_no)">
      <van-col span="5">
        <van-image width="50" height="50" radius="5" :src="item.serviceImg"></van-image>
      </van-col>
      <van-col span="14">
        <div class="text1">{{ item.service_name }}</div>
        <div class="text2">
          <div>{{ item.hospital_name }}</div>
          <div>预约时间：{{ item.starttime }}</div>
        </div>
      </van-col>
      <van-col class="text2" span="5" :style="{ color: colorMap[item.trade_state] }">
        {{ item.trade_state }}
        <Counter v-if="item.trade_state === '待支付'" :second="item.timer" />
      </van-col>
    </van-row>
    <div class="bottom-text">没有更多了</div>
  </div>
</template>
<script setup>
import { onMounted, getCurrentInstance, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Counter from '../../components/counter.vue';

const router = useRouter();
const active = ref("");
const { proxy } = getCurrentInstance();
const orderList = ref([]);
const colorMap = {
  "待支付": "#ffa200",
  "待服务": "#ffa200",
  "已完成": "#ffa200",
}

const getOrderList = async (state) => {
  console.log(state, { state })
  const { data } = await proxy.$api.orderList({ state })
  console.log(data)
  data.data.forEach(item => {
    item.timer = item.order_start_time + 7200000 - Date.now()
  })
  orderList.value = data.data

}
const onClickTab = (item) => {
  getOrderList(item)
}

const goDetail = (orderId) => {
  console.log(orderId)
  router.push(`/detail?oid=${orderId}`)
}

</script>
<style lang="less" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
  overflow: auto;
}

.header {
  background-color: #fff;
  line-height: 40px;
  text-align: center;
}

.van-row {
  background-color: #fff;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;

  .text1 {
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
  }

  .text2 {
    font-size: 14px;
    line-height: 20px;
    color: #999999;
  }
}

.bottom-text {
  line-height: 50px;
  text-align: center;
  color: #999999;
}
</style>