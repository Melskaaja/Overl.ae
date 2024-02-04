<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const $route = useRouter().currentRoute.value;

let countdown = ref('00:00');

let position = 'tc';
if ($route.query.p) {
  position = $route.query.p ?? 'tc';
}

// check when to start
let now = new Date();
let at = new Date();
if ($route.query.at) {
  at = new Date($route.query.at * 1000);
}

// check if time has already passed from start time
let startPassed = Math.floor((now.getTime() - at.getTime()) / 1000);
let timeLeft = $route.params.from - (startPassed > 0 ? startPassed : 0);

// update on-screen timer about every second
const updateTimer = () => {
  if (timeLeft >= 0) {
    let hr = Math.floor(timeLeft / (60 * 60));
    let min = (Math.floor(timeLeft / 60) - (hr * 60) + '').padStart(2, '0');
    let sec = (timeLeft - (min * 60) - (hr * 60 * 60) + '').padStart(2, '0');

    countdown.value = (hr ? hr+':' : '')+min+':'+sec;

    if (now >= at) {
      timeLeft--;
    }
  }

  // add colors at <= 10 seconds and at 00:00
  if (timeLeft < 10 && timeLeft >= 0) {
    window.document.body.classList.add('warn');
  } 
  if (timeLeft < 0) {
    window.document.body.classList.remove('warn');
    window.document.body.classList.add('done');
    return;
  }

  now = new Date();
  setTimeout(updateTimer, 1000);
}

let font = 'fbl';
if ($route.query.f) {
  font = $route.query.f ?? 'fbl';
}

// when the page loads, make sure there are no colors before initializing countdown
onMounted(() => {
  window.document.body.classList.remove('warn');
  window.document.body.classList.remove('done');
  window.document.body.classList.add('overlay');
  window.document.body.classList.add(position);
  window.document.body.classList.add(font);
  updateTimer();
});
</script>


<template>
  <span class="main">
    {{ countdown }}
  </span>
</template>
