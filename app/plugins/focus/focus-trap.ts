// directives/focusTrap.ts
import type { Directive } from "vue";

declare global {
  interface HTMLElement {
    __focusTrapHandler__?: (event: KeyboardEvent) => void;
  }
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      `
      button,
      [href],
      input,
      select,
      textarea,
      [tabindex]:not([tabindex="-1"])
      `,
    ),
  ).filter((el) => !el.hasAttribute("disabled"));
}

const focusTrap: Directive<HTMLElement, boolean> = {
  mounted(el) {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusables = getFocusableElements(el);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (active === first) {
          event.preventDefault();
          last?.focus();
        }
      } else {
        // Tab
        if (active === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    el.__focusTrapHandler__ = handler;
    document.addEventListener("keydown", handler);
  },

  unmounted(el) {
    if (el.__focusTrapHandler__) {
      document.removeEventListener("keydown", el.__focusTrapHandler__);
    }
  },
};

export default focusTrap;
