import autoFocus from "./focus/auto-focus";
import focusTrap from "./focus/focus-trap";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("focus", autoFocus);
  nuxtApp.vueApp.directive("focus-trap", focusTrap);
});
