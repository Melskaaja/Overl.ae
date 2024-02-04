<script setup>
import { watch, ref } from 'vue'
import FontSelector from '@/components/FontSelector.vue'
import MSOIcon from '@/components/icons/MSOIcon.vue'
import NumberRoller from '@/components/NumberRoller.vue'
import PositionSelector from '@/components/PositionSelector.vue'

const finalUrl = ref('');

const selectFinalUrl = () => document.querySelector('.final-url').select();

const rollHourTime = ref(0);
const rollMinTime = ref(1);
const rollSecTime = ref(30);

const addPos = ref(false);
const position = ref('tc');

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

const changeFont = ref(false);
const font = ref('fbl');

watch([rollHourTime, rollMinTime, rollSecTime, addAt, rollTimestampAt, addPos, position, changeFont, font], (values) => {
  let newSeconds = (values[0] * 60 * 60) + (values[1] * 60) + values[2];
  let query = [];
  if (values[3]) query.push('at=' + values[4]);
  if (values[5]) query.push('p=' + values[6]);
  if (values[7]) query.push('f=' + values[8]);
  finalUrl.value = 'https://ovrly.me/timer/' + newSeconds + (query.length ? '?' + query.join('&') : '');
});
</script>

<template>
  <section>
    <h1>Timer Overlay</h1>

    <p>This is for you when you need a timer to run on your stream for a length of time of your choosing. 
      You can also set the time that it needs to start - no more forgetting to start timers for events! (I guess that's only 
      useful if your event starts at a very specific time..) Here's a minimal example: 
      <em><RouterLink to="/timer/20" target="_blank">https://ovrly.me/timer/20</RouterLink></em></p>

    <h3><em>URL</em> Generator</h3>

    <p>How long should the timer run for (hours/minutes/seconds)?</p>

    <div class="roller-container">
      <div class="roller-group">
        <NumberRoller min="0" max="10" v-model="rollHourTime"></NumberRoller>
        <NumberRoller min="0" max="59" v-model="rollMinTime"></NumberRoller>
        <NumberRoller min="0" max="59" v-model="rollSecTime"></NumberRoller>
      </div>
    </div>

    <p>
      <input type="checkbox" v-model="addAt" id="addAt"/>
      <label for="addAt">Start timer at a certain time? (Roller timezone is your browser's timezone, {{ userTZ }})</label>
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
      <input type="checkbox" v-model="addPos" id="addPos"/>
      <label for="addPos">Set timer's on-screen position?</label>
    </p>

    <PositionSelector v-if="addPos" v-model="position" />

    <p>
      <input type="checkbox" v-model="changeFont" id="changeFont"/>
      <label for="changeFont">Change the overlay font?</label>
    </p>

    <FontSelector v-if="changeFont" v-model="font"/>
    

    <p>
      Your overlay URL:
      <input type="text" class="final-url" v-model="finalUrl" v-on:focus="selectFinalUrl" />
    </p>

    <h3>Nitty gritty time!</h3>

    <p>Here are all of the available options to consider when you use the timer overlay.</p>

    <ul>
      <li>Seconds (part of url) <span class="inline-icon text-danger"><MSOIcon>star</MSOIcon></span>: how long the timer should run for in seconds</li>
      <li>Starting timestamp (query parameter): the <a href="https://www.epochconverter.com/" target="_blank">Unix timestamp</a> for when to start the timer. Please note: time already
        on the timer will take the starting timestamp into account when calculating how far along the timer is.
        <ul>
          <li><strong>at=1704110400</strong> - start at 12pm GMT on Jan 1st, 2024</li>
        </ul>
      </li>
      <li>Timer's default position on the screen (query parameter):
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
</style>
