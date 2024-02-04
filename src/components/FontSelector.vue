<script setup>
import { ref, watch } from 'vue'

const properties = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const font = ref(properties.modelValue ?? 'fbl')

const availableFonts = {
  fbl: 'Blockletter (default)',
  fmt: 'Minecraft 1',
  fmc: 'Minecraft 2',
  fka: 'Karantina',
}

watch(font, (newFont) => emits('update:modelValue', newFont))
</script>

<template>
  <p>
    <ul class="fontList">
      <li v-for="(label, code) in availableFonts" :key="code">
        <input type="radio" name="font" v-model="font" :id="'font_'+code" :value="code"/>
        <label :for="'font_'+code" v-html="label" :class="code"></label>
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

ul.fontList {
  display: flex;
  flex-flow: row wrap;
  align-items: start;

  li {
    list-style: none;
    flex: 0 1 25%;

    label.fbl {
      font-family: 'Blockletter', sans-serif;
    }
    label.fka {
      font-family: var(--oae-font-block), serif;
    }
    label.fmt {
      font-family: 'Minecraft Fifty', monospace;
    }
    label.fmc {
      font-family: 'Minecraft', monospace;
    }
    
  }
}
</style>