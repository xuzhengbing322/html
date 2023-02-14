<template>
  <div>
    <ul>
      <li v-for="item of msgList" :key="item.id">
        <p>
          <span>{{ item.user }}</span>
          <span>{{ new Date(item.dateTime)}}</span>
        </p>
        <p>
          消息：{{ item.msg }}
        </p>
      </li>
    </ul>
    <input type="text" placeholder="请输入消息" v-model="msg" />
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>

<script setup >
import { reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useWebSocket } from '../hooks'

const router = useRouter();
const ws = useWebSocket(handleMessage);
const state = reactive({
  msg: '',
  msgList: []
})
const { msg, msgList } = toRefs(state)

let username = '';

onMounted(() => {
  username = localStorage.getItem('username');

  if (!username) {
    router.push('/login');
    return;
  }
})




// 点击发送时，获取msg内容。如果msg非空，则构建一个基于msg的对象放入msgList
const handleSendBtnClick = () => {
  const _msg = state.msg;

  if (!_msg.trim().length) {
    return;
  }
//JSON.stringify()将javascript对象或值转换成JSON字符串。然后发送给后端。
  ws.send(JSON.stringify({
    id: new Date().getTime(),
    user: username,
    dataTime: new Date().getTime(),
    msg: state.msg,
  }));


  state.msg = '';
}

// 接受后端广播出来的信息。JSON.parse()：解析JSON字符串，构造由字符串描述的JavaScript值或者对象。
function handleMessage (e) {
  const _msgData = JSON.parse(e.data);
  state.msgList.push(_msgData);
  // console.log("e", e)
}

</script>

<style scoped>
</style>