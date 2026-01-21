<template>
  <div
    class="toast-container"
    aria-live="polite"
    aria-relevant="additions removals"
    v-focus-trap
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="toast.type"
      role="status"
      tabindex="0"
      @keydown.esc="removeToast(toast.id)"
      @pointerdown="onStart($event, toast.id)"
      @pointerup="onEnd($event, toast.id)"
    >
      <span class="toast-message">
        {{ toast.description }}
      </span>

      <button
        class="toast-close"
        aria-label="Dismiss notification"
        @click="removeToast(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);

const startX = ref<number | null>(null);
const SWIPE_THRESHOLD = 80;

function removeToast(id: string) {
  toastStore.removeToast(id);
}

function onStart(event: PointerEvent, id: string) {
  startX.value = event.clientX;
}

function onEnd(event: PointerEvent, id: string) {
  if (startX.value === null) return;

  const deltaX = event.clientX - startX.value;

  if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
    removeToast(id);
  }

  startX.value = null;
}
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  touch-action: pan-y;
  outline: none;
  justify-content: space-between;

  @media (prefers-reduced-motion: no-preference) {
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--ring);
  }
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  cursor: pointer;
}

.good {
  background-color: var(--accent);
  color: var(--accent-foreground);
}
.bad {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}
</style>
