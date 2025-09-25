import React, { useState } from "react";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoMdSend } from "react-icons/io";
import axios from "axios";

const CommentPanal = (props) => {
  const [comment, setcomment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return; // avoid empty comments

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/food/comment`,
        {
          user: props.user._id,
          foodId: props.getCommentId._id,
          comment: comment,
        },
        {
          withCredentials: true,
        }
      );

      // console.log("Comment saved:", response.data);

      // Reset input
      setcomment("");

      // Refresh comments after posting
      if (props.getCommentId?._id) {
        props.refreshComments(props.getCommentId._id);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm">
        <h2 className="text-zinc-700 text-sm font-semibold">
          Comments ({props.getComments?.length || 0})
        </h2>
        <button
          onClick={() => props.setshowCommentPanal(false)}
          className="text-zinc-500 text-2xl hover:text-zinc-700"
        >
          <TfiLayoutLineSolid />
        </button>
      </div>

      {/* Comments List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-80 ">
        {Array.isArray(props.getComments) && props.getComments.length > 0 ? (
          props.getComments.map((c) => (
            <div key={c._id} className="flex items-start gap-2">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=60"
                alt={c.name}
              />
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <h3 className="text-xs font-semibold">{c.user.email}</h3>
                <p className="text-xs text-gray-600">{c.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center">
            No comments yet. Be the first!
          </p>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center absolute bottom-60 w-full gap-2 px-4 py-3 bg-white">
        <form className="w-full flex gap-2" onSubmit={submitHandler}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            placeholder="Leave a comment..."
            className="flex-1 w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-zinc-300"
          />
          <button className="text-xl text-black hover:text-blue-600">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentPanal;
