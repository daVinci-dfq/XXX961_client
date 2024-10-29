<template>
  <div class="top_bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style>
.top_bar {
  display: flex;
}
.left,
.center,
.right {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
}
.center {
  flex: 1;
}
</style>
