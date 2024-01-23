<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const $route = useRouter().currentRoute.value;

let timer = ref('00:00');

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
let countTo = $route.params.to;
let startPassed = Math.floor((now.getTime() - at.getTime()) / 1000);
if (startPassed < 0) startPassed = 0;
if (startPassed > countTo) startPassed = countTo;
let timeLeft = countTo - startPassed;

// update on-screen timer about every second
const updateTimer = () => {
  if (startPassed <= countTo) {
    let hr = Math.floor(startPassed / (60 * 60));
    let min = (Math.floor(startPassed / 60) + '').padStart(2, '0');
    let sec = (startPassed - (min * 60) + '').padStart(2, '0');

    timer.value = (hr ? hr+':' : '')+min+':'+sec;

    if (now >= at) {
      startPassed++;
    }
  }

  // add colors at <= 10 seconds and at 00:00
  timeLeft = countTo - startPassed;
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

let font = 'fti';
if ($route.query.f) {
  font = $route.query.f ?? 'fti';
}

// when the page loads, make sure there are no colors before initializing timer
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
    {{ timer }}
  </span>
</template>
