export default function useFocused() {
  const isFocused = ref<boolean>(false);

  function onFocus() {
    isFocused.value = true;
  }
  function onBlur() {
    isFocused.value = false;
  }

  return {
    isFocused,
    onFocus,
    onBlur,
  };
}
