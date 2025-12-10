import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../../components/socket";
import type { RootState, AppDispatch } from "../../../../Store";

import {
  setOpenGroup,
  setTotalUsers,
  showActiveRoom,
  setSearchFilter,
  setSelectedUserDetails,
} from "../../../../Feature/userSlice";

interface User {
  _id: string;
  email: string;
  isOnline: boolean;
  socketId: string;
  username: string;
  userImage: string;
}

const loggedInUser = localStorage.getItem("email");

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { searchFilter } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(users);
      dispatch(setTotalUsers(users.length - 1));
      setIsLoading(false);
    });

    return () => {
      socket.off("online-users");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================================================================
  // cause a trigger whenever onlineUser changes
  useEffect(() => {
    socket.emit("get-online-users", { search: searchFilter });
    if (!isLoading && onlineUsers.length === 0) {
      setMessage("No user online");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineUsers]);

  return (
    <Wrapper>
      {isLoading ? (
        <h2 className="h-[100px] font-bold text-[1.1rem] flex items-center justify-center loading-effect">
          Loading online users........
        </h2>
      ) : message ? (
        <h2 className="h-[100px] font-bold text-[1.1rem] flex items-center justify-center text-red-500">
          No users online
        </h2>
      ) : (
        <div className="flex flex-col gap-6  justify-center">
          {onlineUsers
            .filter(({ email }) => email !== loggedInUser)
            .map(({ _id, username, isOnline, userImage }) => {
              return (
                <div
                  className="flex items-center gap-4 cursor-pointer group"
                  key={_id}
                  onClick={() => {
                    dispatch(
                      setOpenGroup({
                        private: true,
                        group: false,
                      })
                    );
                    dispatch(
                      setSelectedUserDetails({
                        id: _id,
                        name: username,
                        status: isOnline,
                        image: userImage,
                      })
                    );
                    dispatch(showActiveRoom());
                    dispatch(setSearchFilter(""));
                  }}
                >
                  <div className="w-[60px] h-[60px]  md:w-[70px] md:h-[70px] rounded-full overflow-hidden">
                    <img
                      src={userImage}
                      alt="user-image"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-[0.95rem] md:text-[1.1rem] transition duration-500 group-hover:text-gray-400">
                      {username}
                    </h2>

                    <div className="flex items-center gap-2">
                      <p className="text-[0.8rem] md:text-[0.9rem] transition duration-500 group-hover:text-gray-400">
                        {`${isOnline && "Active Now"}`}
                      </p>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
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

export default Users;
