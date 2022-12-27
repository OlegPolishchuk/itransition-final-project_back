import {Socket} from "socket.io";
import {Comments, Reviews} from "../../models";
import {Comment} from "../../types";

export const socketController = async (socket: Socket) => {

  const roomId = socket.data.roomId;

  let comments = await Comments.findOne({reviewId: roomId}) ;

  if (!comments) {
    comments = new Comments({
      reviewId: roomId,
      comments: [],
    })

    await comments.save();
  }

  socket.join(roomId);

  socket.emit('user-connected-to-room', comments!.comments);

  socket.on('sent-comment', async (comment: Comment) => {
    await Comments.updateOne({reviewId: roomId}, {$push: {comments: comment}});

    await Reviews.updateOne({_id: roomId}, {$inc: {comments: 1}})


    socket.emit('comment-added', comment);
    socket.to(roomId).emit('comment-added', comment);
  })

  socket.on('disconnect', () => {
    socket.disconnect();
  })
}