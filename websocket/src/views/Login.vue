<template>
  <div>
    <input type="text" placeholder="请输入用户名" v-model="username" />
    <button @click="handleEnterBtnClick">进入聊天室</button>
  </div>
</template>

<script setup >
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const username = ref('');
const router = useRouter()

// 组件挂在完毕后，判断Local Storage是否保留username。
onMounted(() => {
  username.value = localStorage.getItem('username');

  if (username.value) {
    router.push('/');
    return;
  }
});

// 判断用户输入的username是否大于6位。
const handleEnterBtnClick = () => {
  const _username = username.value.trim();

  if (_username.length < 6) {
    alert('用户名不小于6位');
    return;
  }

  //用户输入的username大于6位，就将它存入 Local Storag 中。
  localStorage.setItem('username', _username);
  username.value = '';
  router.push('/');
}

</script>

<style scoped>
</style>