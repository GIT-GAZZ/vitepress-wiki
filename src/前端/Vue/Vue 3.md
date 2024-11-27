# Vue 3

## 父组件调用子组件方法

- 父组件

  ```vue
  <template>
  	<button @click='childShow'>点击调用子组件方法</button>
  	<Comp ref='showComp'></Comp>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Comp from './Comp.vue';
  
  const showComp = ref(); // 子组件对象
  const childShow = () => {
  	showComp.value.show(); // 调用子组件方法
  }
  </script>
  ```

- 子组件

  ```vue
  <template>
  	<div>我是子组件</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const show = () => {
  	console.log("子组件方法被调用");
  }
  defineExpose({ show }); // 公开方法
  </script>
  ```

  