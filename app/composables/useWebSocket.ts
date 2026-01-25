const connection = ref<WebSocket | null>(null);
export function useWebSocket(url = "wss://echo.websocket.org") {
  const enabled = ref(false);
  let timer: number | null = null;
  const { createRandomActivity, addActivity, showActivityToast } =
    useActivity();

  function start() {
    if (connection.value) return;
    connection.value = new WebSocket(url);

    connection.value.onopen = () => {
      enabled.value = true;
      startGenerator();
    };

    connection.value.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "activity") {
          const activity = addActivity(message.data);
          showActivityToast(activity);
        }
      } catch (e) {
        console.log("ws:message", event);
      }
    };

    connection.value.onclose = () => {
      console.log("closed");

      stopGenerator();
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

  function startGenerator(minSeconds = 5, maxSeconds = 15) {
    const scheduleNext = () => {
      if (!enabled.value) return;
      const minMs = Math.max(0, Math.floor(minSeconds) * 1000);
      const maxMs = Math.max(minMs, Math.floor(maxSeconds) * 1000);
      const delta = maxMs - minMs;
      const intervalMs = minMs + Math.floor(Math.random() * (delta + 1));
      timer = window.setTimeout(() => {
        const activity = createRandomActivity();
        if (activity) {
          broadcastActivity(activity);
        }
        scheduleNext();
      }, intervalMs) as unknown as number;
    };
    scheduleNext();
  }

  function stopGenerator() {
    if (timer) {
      clearTimeout(timer as number);
      timer = null;
    }
  }

  function broadcastActivity(activity: Activity) {
    sendMessage(
      JSON.stringify({ type: "activity", data: activity }),
      connection.value,
    );
  }

  return { connection, enabled, start, stop, broadcastActivity };
}
