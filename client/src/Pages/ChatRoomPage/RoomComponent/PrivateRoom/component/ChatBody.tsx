import styled from "styled-components";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../Store";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../../../../components/socket";

const url = import.meta.env.VITE_API_URL;

const ChatBody = () => {
  const endRef = useRef<null | HTMLDivElement>(null);
  const [getMessage, setGetMessage] = useState<ChatMessage[]>([]);
  const { activeRoom, chatUserId } = useSelector(
    (store: RootState) => store.user
  );

  const fetchMessages = async () => {
    const senderId = localStorage.getItem("userId");
    const receiverId = chatUserId;

    try {
      const res = await axios.get(`${url}/messages/${senderId}/${receiverId}`);

      const data = res.data;

      setGetMessage(data);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      if (error.response) {
        toast.error(
          error.response.data.message || "Request failed. Try again."
        );
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (!activeRoom) return;

    fetchMessages();

    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoom]);

  useEffect(() => {
    if (!activeRoom) return;
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMessage]);

  return (
    <Wrapper>
      <div className="flex gap-4 flex-col h-[82vh] overflow-scroll px-4 py-4">
        {getMessage.map(({ _id, sendBy, message }) => {
          const isCurrentUser = sendBy === localStorage.getItem("userId");

          //    ======================================================================
          // Logged in user

          if (isCurrentUser) {
            return (
              <div className="flex flex-col items-end" key={_id}>
                <h2 className="w-fit max-w-[250px] md:max-w-[500px] text-[0.9rem] md:text-[1rem] p-2 rounded-t-[10px] rounded-bl-[10px]  bg-orange-700 text-white font-bold text-end border-none relative">
                  {message}
                  <div className="left-0 w-full h-[15px] absolute top-[98%] bg-orange-700 rounded-b-[10px]  right-clip"></div>
                </h2>
              </div>
            );
          }

          //         ==========================================================================
          //  other users
          return (
            <div className="flex flex-col" key={_id}>
              <h2 className="w-fit max-w-[250px] md:max-w-[350px] text-[0.9rem] md:text-[1rem] p-2 rounded-t-[10px] rounded-br-[10px] bg-white text-black font-bold border-none relative">
                {message}
                <div className="w-full left-0 h-[15px] bg-white rounded-b-[10px]  left-clip absolute top-[98%]"></div>
              </h2>
            </div>
          );
        })}

        {/* ==================================================================== */}
        {/* always scroll to the bottom */}
        <div ref={endRef}></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .left-clip {
    clip-path: polygon(50% 0%, 93% 0, 20% 100%, 0 100%, 0 0);
  }

  .right-clip {
    clip-path: polygon(50% 0%, 100% 0, 100% 100%, 80% 100%, 7% 0);
  }
`;

export default ChatBody;
