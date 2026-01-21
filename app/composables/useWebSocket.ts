export function useWebSocket(url = "wss://echo.websocket.org") {
  const { startGenerator, stopGenerator } = useActivity();
  const connection = ref<WebSocket | null>(null);
  const enabled = ref(false);

  function start() {
    if (connection.value) return;
    connection.value = new WebSocket(url);

    connection.value.onopen = () => {
      enabled.value = true;
    };

    connection.value.onmessage = (event: MessageEvent) => {
      // keep a console log for now so devs can inspect messages
      console.log("ws:message", event);
    };

    connection.value.onclose = () => {
      enabled.value = false;
      connection.value = null;
    };

    connection.value.onerror = () => {
      enabled.value = false;
    };
  }

  function stop() {
    if (!connection.value) return;
    try {
      connection.value.close();
    } catch (e) {
      // ignore
    }
    connection.value = null;
    enabled.value = false;
  }

  onMounted(() => {
    start();
    startGenerator();
  });

  onBeforeUnmount(() => {
    stop();
    stopGenerator();
  });

  return { connection, enabled, start, stop };
}
