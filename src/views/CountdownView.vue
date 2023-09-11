<script setup>
import { watch, ref } from 'vue'
import MSOIcon from '@/components/icons/MSOIcon.vue'
import NumberRoller from '../components/NumberRoller.vue'

const finalUrl = ref('');
const selectFinalUrl = () => document.querySelector('.final-url').select();

const rollHourTime = ref(0);
const rollMinTime = ref(1);
const rollSecTime = ref(30);

const addPos = ref(false);
const position = ref('tc');
const availablePositions = {
  tl: 'Top left',
  tc: 'Top center (default)',
  tr: 'Top right',
  bl: 'Bottom left',
  bc: 'Bottom center',
  br: 'Bottom right'
}

const addAt = ref(false);
const now = new Date();

const rollHourAt = ref(now.getHours());
const rollMinAt = ref(now.getMinutes());

const rollDayAt = ref(now.getDate());
const rollMonthAt = ref(now.getMonth() + 1); // WHY
const rollYearAt = ref(now.getFullYear());

const rollTimestampAt = ref(Math.floor(now.getTime() / 1000));
const userTZOffset = now.getTimezoneOffset();
const userTZ = (userTZOffset <= 0 ? '+' : '-') + (Math.floor(Math.abs(userTZOffset) / 60) + '').padStart(2, '0') + ':00';

watch([rollMinAt, rollHourAt, rollDayAt, rollMonthAt, rollYearAt], (values) => {
  let newTimestamp = Date.parse(
        values[4] + '-' + (values[3] + '').padStart(2, '0') + '-' + (values[2] + '').padStart(2, '0') + ' ' + 
        (values[1] + '').padStart(2, '0') + ':' + (values[0] + '').padStart(2, '0') + ':00')
  rollTimestampAt.value = Math.floor(newTimestamp / 1000);
});

watch([rollHourTime, rollMinTime, rollSecTime, addAt, rollTimestampAt, addPos, position], (values) => {
  let newSeconds = (values[0] * 60 * 60) + (values[1] * 60) + values[2];
  let query = [];
  if (values[3]) query.push('at=' + values[4]);
  if (values[5]) query.push('p=' + values[6]);
  finalUrl.value = 'https://ovrly.me/countdown/' + newSeconds + (query.length ? '?' + query.join('&') : '');
});
</script>

<template>
  <section>
    <h1>Countdown Overlay</h1>

    <p>
      This is for you when you need a countdown to run on your stream. You can also set the time that it needs to 
      start - no more forgetting to start countdowns for events! (I guess that's only useful if your event starts at a 
      very specific time..) The overlay is smart: if you give it a starting time and you refresh the source, it'll 
      always continue from the time it should be at.
    </p>

    <p>Here's a minimal example: <em><RouterLink to="/countdown/20" target="_blank">https://ovrly.me/countdown/120</RouterLink></em></p>

    <h3><em>URL</em> Generator</h3>

    <p>How long should the countdown be (hours/minutes/seconds)?</p>

    <div class="roller-container">
      <div class="roller-group">
        <NumberRoller min="0" max="10" v-model="rollHourTime"></NumberRoller>
        <NumberRoller min="0" max="59" v-model="rollMinTime"></NumberRoller>
        <NumberRoller min="0" max="59" v-model="rollSecTime"></NumberRoller>
      </div>
    </div>

    <p>
      <input type="checkbox" v-model="addPos" id="addPos"/>
      <label for="addPos">Set countdown's on-screen position?</label>
    </p>

    <p v-if="addPos">
      <ul class="positionList">
        <li v-for="(label, code) in availablePositions" :key="code">
          <input type="radio" name="position" v-model="position" :id="'position_'+code" :value="code"/>
          <label :for="'position_'+code" v-html="label"></label>
        </li>
      </ul>
    </p>

    <p>
      <input type="checkbox" v-model="addAt" id="addAt"/>
      <label for="addAt">Start countdown at a certain time? (Roller timezone is {{ userTZ }})</label>
    </p>

    <div class="roller-container" v-if="addAt">
      <div class="roller-group">
        <NumberRoller min="0" max="23" v-model="rollHourAt"></NumberRoller>
        <NumberRoller min="0" max="59" v-model="rollMinAt"></NumberRoller>
      </div>
      <div class="roller-group">
        <NumberRoller min="1" max="31" v-model="rollDayAt"></NumberRoller>
        <NumberRoller min="1" max="12" v-model="rollMonthAt"></NumberRoller>
        <NumberRoller :min="new Date().getFullYear()" :max="new Date().getFullYear() + 1" v-model="rollYearAt"></NumberRoller>
      </div>
    </div>

    <p>
      Your overlay URL:
      <input type="text" class="final-url" v-model="finalUrl" v-on:focus="selectFinalUrl" />
    </p>

    <h3>So what is all of that?</h3>

    <p>Here are all of the available options to consider when you use the countdown overlay.</p>

    <ul>
      <li>Time (part of url) <span class="inline-icon text-danger"><MSOIcon>star</MSOIcon></span>: how long (in seconds) the countdown is</li>
      <li>Starting timestamp (query parameter): the <a href="https://www.epochconverter.com/" target="_blank">Unix timestamp</a> for when to start the countdown
        <ul>
          <li><strong>at=1704110400</strong> - start at 12pm GMT on Jan 1st, 2024</li>
        </ul>
      </li>
      <li>Countdown position on fullscreen (query parameter):
        <ul>
          <li v-for="(label, code) in availablePositions" :key="code"><strong>p={{ code }}</strong> - {{ label }}</li>
        </ul>
      </li>
    </ul>


  </section>
</template>

<style scoped lang="scss">
.final-url {
  width: 100%;
  font-size: 1em;
  padding: 0.4em 1em;
}

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

.roller-container {
  display: flex;
  gap: 1em;
  align-items: center;
  margin: 1em 0;

  .roller-group {
    display: flex;
    align-items: center;

    .number-roller:not(:last-child) {
      border-right: 1px solid #444;
    }
  }

  div:not(.number-roller) {
    margin-left: 1em;
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
