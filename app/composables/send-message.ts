export function sendMessage(message: string, connection: WebSocket | null) {
  if (connection && connection.readyState === WebSocket.OPEN) {
    connection.send(message);
  }
}
