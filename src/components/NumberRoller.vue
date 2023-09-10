<script setup>
import { onMounted, ref } from 'vue'

const rollerUniqid = (Math.random() * 1000).toFixed(0) + Math.floor(Date.now())

const intProps = ['min', 'max'];
const boolProps = ['forever'];

let options = { min: 0, max: 10, forever: false }

const properties = defineProps(['modelValue', 'min', 'max', 'forever'])
const emits = defineEmits(['update:modelValue'])

for (const opt in options) {
  if (undefined !== properties[opt]) {
    if (-1 < intProps.indexOf(opt)) {
      options[opt] = parseInt(properties[opt]);
    } else if (-1 < boolProps.indexOf(opt)) {
      options[opt] = !!properties[opt];
    }
  }
}

const roller = ref(options.min);

let debouncer = null;
const debounce = function(fnc, delay) {
  clearTimeout(debouncer);
  debouncer = setTimeout(() => {
    fnc();
  }, delay || 100);
}

const initialScroll = () => {
  const container = document.querySelector('.number-roller#roller-' + rollerUniqid);
  const itemHeight = container.querySelector('.number-roller-item:first-of-type').offsetHeight;
  const target = properties.modelValue ?? options.min;

  container.scrollTo({ top: itemHeight * (target - options.min), behavior: 'smooth' })
}

const detectCurrent = () => {
  const container = document.querySelector('.number-roller#roller-' + rollerUniqid);
  const scrollY = container.scrollTop;
  const itemHeight = container.querySelector('.number-roller-item:first-of-type').offsetHeight;

  roller.value = Math.floor(scrollY / itemHeight) + options.min;
  emits('update:modelValue', roller.value)
}

onMounted(() => {
  initialScroll()
  detectCurrent()
})
</script>

<template>
  <div :id="'roller-' + rollerUniqid" class="number-roller" v-on:scroll="debounce(() => detectCurrent())">
    <div class="number-roller-item" v-for="n in Math.floor(options.max - options.min + 1)" :key="n" :data-value="n - 1 + options.min">
      {{ n - 1 + options.min }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.number-roller {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  height: 4em;
  width: 4em;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(200, 200, 200, 0.15), rgba(0, 0, 0, 0));

  &::-webkit-scrollbar {
    display: none;
  }

  > .number-roller-item {
    line-height: 2em;
    height: 2em;
    width: 100%;
    text-align: center;
    scroll-snap-align: center;

    &:first-child {
      margin-top: 1em;
    }
    &:last-child {
      margin-bottom: 1em;
    }
  }
}
</style>