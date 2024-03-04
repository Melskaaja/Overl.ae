<script setup>
import { onMounted, ref } from 'vue'
import MSOIcon from '@/components/icons/MSOIcon.vue'

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

const rollerUniqid = (Math.random() * 1000).toFixed(0) + Math.floor(Date.now())
const roller = ref(options.min);

let debouncer = null;
const debounce = function(fnc, delay) {
  clearTimeout(debouncer);
  debouncer = setTimeout(() => {
    fnc();
  }, delay || 100);
}

const items = () => {
  const itemContainer = document.querySelector('.number-roller#roller-' + rollerUniqid + ' .number-roller-items')
  const itemHeight = itemContainer.querySelector('.number-roller-item:first-of-type').offsetHeight
  const itemsCount = itemContainer.querySelectorAll('.number-roller-item').length
  return [itemContainer, itemHeight, itemsCount];
}

const initialScroll = () => {
  let [cont, height] = items();
  const target = properties.modelValue ?? options.min;
  cont.scrollTo({ top: height * (target - options.min), behavior: 'smooth' })
}

const detectCurrent = () => {
  let [cont, height] = items();
  const scrollY = cont.scrollTop;
  roller.value = Math.floor(scrollY / height) + options.min;
  emits('update:modelValue', roller.value)
}

const nudgeUp = () => {
  let [cont, height, count] = items();
  roller.value = Math.min(count - 1, roller.value + 1);
  cont.scrollTo({ top: height * (roller.value), behavior: 'smooth' })
  emits('update:modelValue', roller.value)
}

const nudgeDown = () => {
  let [cont, height] = items();
  roller.value = Math.max(0, roller.value - 1);
  cont.scrollTo({ top: height * (roller.value), behavior: 'smooth' })
  emits('update:modelValue', roller.value)
}

onMounted(() => {
  initialScroll()
  detectCurrent()
})
</script>

<template>
  <div class="number-roller" :id="'roller-' + rollerUniqid">
    <button class="number-roller-adjust number-roller-down" @click="nudgeDown()"><MSOIcon>keyboard_arrow_up</MSOIcon></button>
    <div class="number-roller-items" v-on:scroll="debounce(() => detectCurrent())">
      <div class="number-roller-item" v-for="n in Math.floor(options.max - options.min + 1)" :key="n" :data-value="n - 1 + options.min">
        {{ n - 1 + options.min }}
      </div>
    </div>
    <button class="number-roller-adjust number-roller-up" @click="nudgeUp()"><MSOIcon>keyboard_arrow_down</MSOIcon></button>
  </div>
</template>

<style scoped lang="scss">
.number-roller {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;

  .number-roller-adjust {
    position: relative;
    cursor: pointer;
    text-align: center;

    width: 100%;
    height: 1em;
    
    background-color: transparent;
    border-radius: 0;
    border: 0;

    span {
      color: var(--oae-color-french-gray);
      font-weight: 600;
    }
  }

  .number-roller-items {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: relative;
    
    height: 4em;
    width: 4em;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(200, 200, 200, 0.15), rgba(0, 0, 0, 0));

    &::-webkit-scrollbar {
      display: none;
    }

    .number-roller-item {
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
}
</style>