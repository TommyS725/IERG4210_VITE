<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-inner {
  @apply bg-neutral-800 text-white rounded-2xl;
  max-height: 90vh;
  max-width: 70vw;
  overflow: auto;
  padding: 20px 32px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
</style>
