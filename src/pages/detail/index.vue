<template>
  <div class="container">
    <div class="header">
      <van-icon class="header-left" size="30" @click="goback" name="arrow-left" />
      订单详情
    </div>
    <Progress :item="progressMap[orderInfo.trade_state]" />
    <div class="tips">
      <div class="dzf" v-if="orderInfo.trade_state === '待支付'">
        <div class="text1">订单待支付</div>
        <div class="text2">
          请在
          <Counter v-if="orderInfo.trade_state === '待支付'" :second="timer" />内完成支付，超时订单将自动取消
        </div>
        <div class="text3">
          <van-button type="success" @click="showPay = true">立即支付</van-button>
        </div>
      </div>
      <div class="dzf" v-if="orderInfo.trade_state === '待服务'">
        <div class="text1">正在为您安排服务专员</div>
        <div class="text2">稍后会有服务专员联系您</div>
      </div>
      <div class="dzf" v-if="orderInfo.trade_state === '已完成'">
        <div class="text1">服务已完成</div>
        <div class="text2">如有售后问题请联系客服</div>
      </div>
      <div class="dzf" v-if="orderInfo.trade_state === '已取消'">
        <div class="text1">订单已取消</div>
        <div class="text2">如有其他问题请联系客服</div>
      </div>
    </div>
    <van-cell-group class="card">
      <div class="header-text">预约信息</div>
      <van-cell 
      v-for="(value, key) in makeInfo"
      :key="value"
      :title="value"
      :value="formatData(key)"
      >
      </van-cell>
    </van-cell-group>
    <van-cell-group class="card">
      <div class="header-text">订单信息</div>
      <van-cell 
      v-for="(value, key) in orderDetail"
      :key="value"
      :title="value"
      :value="formatData(key)"
      >
      </van-cell>
    </van-cell-group>
    <!-- 二维码弹窗 -->
    <van-dialog v-model:show="showPay" :show-confirm-button="false">
      <!--  -->
      <van-icon class="close" name="cross" @click="onClosePay" />
      <div>微信支付</div>
      <van-image width="100" height="100" :src="payurl" />
    </van-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Progress from '../../components/Progress.vue';
import Qrcode from 'qrcode'

const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const orderInfo = reactive({});
const showPay = ref(false);
const payurl = ref('')


const progressMap = {
  "待支付": 10,
  "待服务": 20,
  "已完成": 30,
  "已取消": 40
}
const timer = computed(
  () => {
    return orderInfo.order_start_time ? orderInfo.order_start_time + 7200000 - Date.now() : 0
  }
) 
onMounted(() => {
  const oid = route.query.oid;
  getDetail(oid);
})

const goback = () => {
  router.go(-1)
}
const getDetail = async (oid) => {
  const { data } = await proxy.$api.orderDetail({ oid });
  Object.assign(orderInfo, data.data)
  console.log(orderInfo);
  Qrcode.toDataURL(orderInfo.code_url).then(url => {
    payurl.value = url
  }).catch(err => {
    console.log(err)
  })
}
const onClosePay = () => {
  showPay.value = false;
  router.push('/order')
}
// 订单详情
const makeInfo = {
  service_name: "预约服务",
  hospital_name: "就诊医院",
  starttime: "期望就诊时间",
  'client.name': '预约人',
  'client.mobile': '预约人电话',
  receiveAddress: '预约地址',
  demand: '其他需求',
}
const orderDetail = {
  tel: '就诊人电话',
  order_start_time: '下单时间',
  price: '应付金额',
  out_trade_no: '订单编号'
}
const formatData = (key) => {
  if (key.indexOf(".") === -1) {
    if (key === "order_start_time") {
      return formatTimestamp(orderInfo[key]);
    }
    return orderInfo[key];
  }
  let arr = key.split(".")
  if(orderInfo[arr[0]]) {
    console.log(orderInfo[arr[0]][arr[1]]);
    return orderInfo[arr[0]][arr[1]]
  }

}
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
</script>
<style lang="less" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
}

.header {
  background-color: #fff;
  line-height: 40px;
  text-align: center;

  .header-left {
    float: left;
  }
}

.card {
  margin: 15px 0;
  padding: 10px;

  .header-text {
    padding-left: 5px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    border-left: 4px solid red;
  }
}

.dzf {
  padding: 20px;

  .text1 {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    color: #666;
  }

  .text2 {
    font-size: 14px;
    color: #666;
  }

  .text3 {
    text-align: center;

    .van-button {
      margin-top: 10px;
      margin-left: 10px;
      width: 80%;
      font-weight: bold;
    }
  }
}

::v-deep(.van-dialog__content) {
  text-align: center;
  padding: 20px;

  .close {
    position: absolute;
    left: 20px;
  }
}
</style>