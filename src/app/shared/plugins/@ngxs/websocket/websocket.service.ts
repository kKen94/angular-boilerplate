import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { Actions, getValue, ofActionDispatched, Store } from '@ngxs/store';
import { Connection, NgxsWebsocketCustomPluginOptions } from './model';
import {
  ConnectWebSocket,
  DisconnectWebSocket,
  SendWebSocketMessage,
  TypeKeyPropertyMissingError,
  WebSocketConnected,
  WebSocketDisconnected,
  WebsocketMessageError,
  WebSocketMessageReceived,
  WebSocketReconnected,
  WebSocketReconnecting,
} from './websocket.action';

export const websocketOptionsFactory = (
  options: NgxsWebsocketCustomPluginOptions,
) => ({
  typeKey: 'Type',
  skipNegotiation: false,
  transport: signalR.HttpTransportType.WebSockets,
  reconnectInterval: 5000,
  ...options,
});

@Injectable()
export class WebSocketHandler {
  private get connections(): Connection[] {
    return this._connections;
  }

  private set connections(value: Connection[]) {
    this._connections = value;
  }

  // tslint:disable-next-line:variable-name
  private _connections: Connection[] = [];

  constructor(private store: Store, private actions$: Actions) {
    this.setupActionsListeners();
  }

  getConnectionId(name: string): string | undefined {
    return this.connections.find(c => c.name === name)?.id;
  }

  private setupActionsListeners(): void {
    this.actions$
      .pipe(ofActionDispatched(ConnectWebSocket))
      .subscribe(({ payload }) => {
        this.connect(websocketOptionsFactory(payload));
      });

    this.actions$
      .pipe(ofActionDispatched(DisconnectWebSocket))
      .subscribe(({ payload }) => {
        this.disconnect(payload);
      });

    // this.actions$
    //   .pipe(ofActionDispatched(SendWebSocketMessage))
    //   .subscribe(({ payload }) => {
    //     this.send(payload);
    //   });
  }

  private connect(options: NgxsWebsocketCustomPluginOptions): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(options.url, {
        skipNegotiation: options.skipNegotiation,
        transport: options.transport,
      })
      .withAutomaticReconnect()
      .build();

    connection.onclose(error => {
      console.assert(
        connection.state === signalR.HubConnectionState.Disconnected,
      );
      if (error) {
        this.store.dispatch(new WebsocketMessageError(error));
      }
      this.dispatchWebSocketDisconnected(options.name);
    });

    connection.onreconnecting(error => {
      console.assert(
        connection.state === signalR.HubConnectionState.Reconnecting,
      );
      this.store.dispatch(new WebSocketReconnecting(error));
    });

    connection.onreconnected(connectionId => {
      console.assert(connection.state === signalR.HubConnectionState.Connected);
      this.store.dispatch(new WebSocketReconnected(connectionId));
    });

    connection.on('state-message', (message: { _: unknown }) => {
      this.store.dispatch(new WebSocketMessageReceived(message));
      if (!options.typeKey) {
        throw new Error('Missing parameter typeKey');
      }
      const type = getValue(message, options.typeKey);
      if (!type) {
        throw new TypeKeyPropertyMissingError(options.typeKey);
      }
      this.store.dispatch({ ...message, type });
    });

    this.start(connection, options);
  }

  private start(
    connection: HubConnection,
    options: NgxsWebsocketCustomPluginOptions,
  ): void {
    connection.start().then(
      async () => {
        console.assert(
          connection.state === signalR.HubConnectionState.Connected,
        );
        const connectionId = await connection.invoke('getConnectionId');
        this.store.dispatch(new WebSocketConnected());
        this._connections.push({
          hub: connection,
          name: options.name,
          id: connectionId,
        });
      },
      err => {
        console.assert(
          connection.state === signalR.HubConnectionState.Disconnected,
        );
        this.store.dispatch(new WebsocketMessageError(err));
        setTimeout(
          () => this.start(connection, options),
          options.reconnectInterval,
        );
      },
    );
  }

  private disconnect(name: string): void {
    const connection = this._connections?.find(c => c.name === name)?.hub;
    connection?.stop().then(() => {
      this.dispatchWebSocketDisconnected(name);
    });
  }

  // private send(data): void {
  //   if (!this.connection) {
  //     throw new Error('
  //       You must connect to the socket before sending any data
  //     ');
  //   }
  //   this.connection.send(data).then(
  //     () => {},
  //     err => {},
  //   );
  // }

  /**
   * Used in many places so it's better to move the code into function
   */
  private dispatchWebSocketDisconnected(name: string): void {
    this.store.dispatch(new WebSocketDisconnected());
    this._connections = this._connections.filter(c => c.name !== name);
  }
}
