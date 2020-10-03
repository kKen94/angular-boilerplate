import { Connection, NgxsWebsocketCustomPluginOptions } from './model';

/**
 * Action to connect to the websocket. Optionally pass a URL.
 */
export class ConnectWebSocket {
  static get type(): string {
    return '[WebSocket] Connect';
  }
  constructor(public payload?: NgxsWebsocketCustomPluginOptions) {}
}

/**
 * Action triggered when a error ocurrs
 */
export class WebsocketMessageError {
  static get type(): string {
    return '[WebSocket] Message Error';
  }
  constructor(public payload: unknown) {}
}

/**
 * Action to disconnect the websocket.
 */
export class DisconnectWebSocket {
  static get type(): string {
    return '[WebSocket] Disconnect';
  }
}

/**
 * Action triggered when websocket is connected
 */
export class WebSocketConnected {
  static get type(): string {
    return '[WebSocket] Connected';
  }
}

/**
 * Action triggered when websocket is disconnected
 */
export class WebSocketDisconnected {
  static get type(): string {
    return '[WebSocket] Disconnected';
  }
}

/**
 * Action to send to the server.
 */
export class SendWebSocketMessage {
  static get type(): string {
    return '[WebSocket] Send Message';
  }
  constructor(public payload: unknown) {}
}

export class WebSocketReconnecting {
  static get type(): string {
    return '[WebSocket] Reconnecting';
  }
  constructor(public payload?: unknown) {}
}

export class WebSocketReconnected {
  static get type(): string {
    return '[WebSocket] Reconnected';
  }
  constructor(public payload?: unknown) {}
}

export class WebSocketMessageReceived {
  static get type(): string {
    return '[WebSocket] Message Received';
  }
  constructor(public payload: unknown) {}
}

/**
 * This error is thrown where there is no `type` (or custom `typeKey`) property
 * on the message that came from the server side socket
 */
export class TypeKeyPropertyMissingError extends Error {
  constructor(typeKey: string) {
    super(`Property ${typeKey} is missing on the socket message`);
  }
}
