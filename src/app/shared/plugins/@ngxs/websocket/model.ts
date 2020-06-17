import {
  HttpTransportType,
  HubConnection,
  ITransport,
} from '@microsoft/signalr';

export interface NgxsWebsocketCustomPluginOptions {
  /**
   * URL of the websocket.
   */
  url: string;

  name: string;

  /**
   * Either a single protocol string or an array of protocol strings.
   * These strings are used to indicate sub-protocols, so that a single server
   * can implement multiple WebSocket sub-protocols (for example, you might want one server to be able
   * to handle different types of interactions depending on the specified protocol).
   * If you don't specify a protocol string, an empty string is assumed.
   */
  transport?: HttpTransportType | ITransport;

  /**
   * Sets the `binaryType` property of the underlying WebSocket.
   */
  skipNegotiation?: boolean;

  /**
   * The property name to distigunish this type for the store.
   * Default: 'Type'
   */
  typeKey?: string;

  /**
   * Interval to try and reconnect.
   * Default: 5000
   */
  reconnectInterval?: number;
}

export interface Connection {
  name: string;
  id: string;
  hub: HubConnection;
}
