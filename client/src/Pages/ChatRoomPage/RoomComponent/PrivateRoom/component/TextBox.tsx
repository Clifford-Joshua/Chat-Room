import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../Store";
import { socket } from "../../../../../components/socket";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { toast } from "react-toastify";

const TextBox = () => {
  const [message, setMessage] = useState<string>("");
  const { chatUserId } = useSelector((store: RootState) => store.user);

  const handleSentMessage = (e: FormEvent) => {
    const senderId = localStorage.getItem("userId");

    e.preventDefault();

    if (message.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }

    socket.emit("private_message", {
      message,
      receiverId: chatUserId,
      senderId: senderId,
      sendBy: senderId,
    });

    setMessage("");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSentMessage}>
        <div className="flex  p-2 md:p-4 justify-between items-center">
          <div className="w-[85%] md:w-[90%] h-[35px] md:h-[45px] rounded-[10px] bg-gray-900  overflow-hidden">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              className="w-full h-full px-2 text-gray-500 text-[0.9rem] focus:text-white"
              placeholder="Message......"
            />
          </div>
          <button
            type="submit"
            className="w-[42px] md:w-[50px] h-[42px] md:h-[50px] text-[1.3rem] cursor-pointer flex items-center justify-center rounded-full shadow shadow-gray-300 bg-orange-500 transition duration-500 hover:bg-orange-700"
          >
            <IoSend />
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TextBox;
