// directives/focus.ts
import type { Directive } from "vue";

const focus: Directive<HTMLElement, boolean> = {
  mounted(el, binding) {
    if (binding.value === true) {
      el.focus();
    }
  },
};

export default focus;
