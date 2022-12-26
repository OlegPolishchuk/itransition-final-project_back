import {Socket} from "socket.io";
import {ExtendedError} from "socket.io/dist/namespace";

export const setUsername = (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
  const userId = socket.handshake.auth.userId;
  const roomId = socket.handshake.auth.reviewId;

  if (!userId) {
    return next(new Error('invalid userId'))
  }


  socket.data.userId = userId;
  socket.data.roomId = roomId;

  next();
}
