<script setup>
import { ref, watch } from 'vue'

const properties = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const position = ref(properties.modelValue ?? 'tl')

const availablePositions = {
  tl: 'Top left',
  tc: 'Top center',
  tr: 'Top right',
  bl: 'Bottom left',
  bc: 'Bottom center',
  br: 'Bottom right'
}

watch(position, (newPos) => emits('update:modelValue', newPos))
</script>

<template>
  <p>
    <ul class="positionList">
      <li v-for="(label, code) in availablePositions" :key="code">
        <input type="radio" name="position" v-model="position" :id="'position_'+code" :value="code"/>
        <label :for="'position_'+code" v-html="label"></label>
      </li>
    </ul>
  </p>
</template>

<style scoped lang="scss">

input[type="checkbox"],
input[type="radio"] {
  &:has(+ label) {
    margin-right: 0.8em;
    cursor: pointer;

    + label {
      cursor: pointer;
    }
  }
}

ul.positionList {
  display: flex;
  flex-flow: row wrap;
  align-items: start;

  li {
    list-style: none;
    flex: 0 1 33%;
  }
}
</style>