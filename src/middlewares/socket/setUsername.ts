import {Socket} from "socket.io";
import {ExtendedError} from "socket.io/dist/namespace";

export const setUsername = (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
  const roomId = socket.handshake.auth.reviewId;

  if (!roomId) {
    return next(new Error('invalid reviewId'))
  }


  socket.data.roomId = roomId;

  next();
}
