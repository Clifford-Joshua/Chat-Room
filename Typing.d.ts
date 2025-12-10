export interface ServerToClientEvents {
  serverMessage: (data: { msg: string; room: string }) => void;
}

export interface ClientToServerEvents {
  clientMessage: (data: { msg: string; room: string }) => void;
}
