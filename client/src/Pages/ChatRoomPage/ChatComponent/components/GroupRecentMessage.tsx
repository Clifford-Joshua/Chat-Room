import { toast } from "react-toastify";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { RootState, AppDispatch } from "./../../../../Store";
import {
  showActiveRoom,
  setSearchFilter,
  showActiveUserPage,
  setSelectedGroupDetails,
} from "../../../../Feature/userSlice";

const url = import.meta.env.VITE_API_URL;

interface chatUi {
  groupId: string;
  groupName: string;
  groupImage: string;
  lastMessage: string;
  lastMessageTime: string;
}

const GroupRecentMessage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [recentChats, setRecentChats] = useState<chatUi[]>([]);
  const { searchFilter } = useSelector((store: RootState) => store.user);

  const fetchRecentChats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/groups/active-group`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { data } = res;

      if (data.length === 0) {
        setMessage("No recent group chat found");
      }

      if (searchFilter) {
        const newGroup = data.filter((group: chatUi) =>
          group.groupName.toLowerCase().includes(searchFilter.toLowerCase())
        );

        setRecentChats(newGroup);

        return;
      }

      setRecentChats(data);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      if (error.response) {
        toast.error(
          error.response.data.message ||
            "Invalid credentials cannot fetch chats"
        );
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  return (
    <Wrapper>
      <div className="h-[76vh] px-[0.7rem] md:px-4 py-2 overflow-y-scroll pb-4">
        {loading ? (
          <h2 className="h-[100px] font-bold text-[1.1rem] flex items-center justify-center loading-effect">
            Loading chats........
          </h2>
        ) : message ? (
          <div className="flex flex-col items-center">
            <h2 className="h-[100px] font-bold text-[1.1rem] flex items-center justify-center text-red-500">
              No Recent Chats........
            </h2>
            <button
              className="w-[85%] md:w-[60%] text-[0.95rem] md:text-[1rem] text-gray-400 font-bold shadow shadow-gray-200  px-4 py-[0.4rem] rounded-[15px] border-gray-400   cursor-pointer transition duration-300 hover:bg-orange-700 hover:text-white"
              onClick={() => dispatch(showActiveUserPage())}
            >
              See groups
            </button>
          </div>
        ) : (
          recentChats.map(
            ({
              groupId,
              groupImage,
              groupName,
              lastMessage,
              lastMessageTime,
            }) => {
              return (
                <div
                  className="flex items-center gap-2 py-2 cursor-pointer"
                  key={groupId}
                  onClick={() => {
                    dispatch(
                      setSelectedGroupDetails({
                        id: groupId,
                        groupId: groupId,
                        name: groupName,
                        image: groupImage,
                      })
                    );
                    dispatch(showActiveRoom());
                    dispatch(setSearchFilter(""));
                  }}
                >
                  <div className="w-[55px] h-[55px]  md:w-[65px] md:h-[65px] rounded-full overflow-hidden relative">
                    <img
                      src={groupImage}
                      alt={groupName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col w-[80%] md:w-[90%]">
                    <div className="flex justify-between items-center">
                      <h2 className="text-[0.95rem] md:text-[1rem] font-bold capitalize flex items-center gap-2">
                        {groupName}
                      </h2>
                      <p className="text-[0.7rem] font-bold text-gray-400">
                        {new Date(lastMessageTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="text-[0.75rem] md:text-[0.8rem] text-gray-400">
                      {lastMessage.length > 30
                        ? `${lastMessage.substring(0, 30)}...`
                        : lastMessage}
                    </p>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @keyframes loading-effect {
    0% {
      color: white;
    }
    25% {
      color: gray;
    }
    50% {
      color: white;
    }
    75% {
      color: gray;
    }
    100% {
      color: white;
    }
  }

  .loading-effect {
    animation: loading-effect 3s infinite;
  }
`;

export default GroupRecentMessage;
