import styled from "styled-components";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { socket } from "../../../../components/socket";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../Store";

import {
  setOpenGroup,
  showActiveRoom,
  setSearchFilter,
  setIsActiveUserPage,
  setSelectedGroupDetails,
} from "../../../../Feature/userSlice";

const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

interface Group {
  _id: string;
  members: [];
  groupName: string;
  createdBy: string;
  groupImage: string;
}

const UserGroups = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [UserGroups, setUsersGroups] = useState<Group[]>([]);
  const { searchFilter, isActiveUserPageOpen } = useSelector(
    (store: RootState) => store.user
  );

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      if (!token) {
        setMessage("No auth token found");
        return;
      }

      const res = await axios.get(`${url}/groups/user-Groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { groups, counts } = res.data;

      if (counts === 0) {
        setMessage("Sorry users does not have a group");
        return;
      }

      if (searchFilter) {
        const newGroup = groups.filter((group: Group) =>
          group.groupName.toLowerCase().includes(searchFilter.toLowerCase())
        );

        setUsersGroups(newGroup);

        return;
      }

      setUsersGroups(groups);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Invalid credentials cannot fetch group"
        );
      } else if (error.request) {
        setMessage("No response from server. Please try again.");
      } else {
        setMessage("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isActiveUserPageOpen) return;
    setTimeout(() => {
      dispatch(setIsActiveUserPage(false));
    }, 3000);
    fetchGroups();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveUserPageOpen]);

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  return (
    <Wrapper>
      <h3 className="text-[0.95rem] md:text-[1.05rem] text-gray-400 mb-1">
        User groups on ChatRoom
      </h3>
      {isLoading ? (
        <h2 className="h-[100px] font-bold text-[1.1rem] flex items-center justify-center loading-effect">
          Loading online users........
        </h2>
      ) : message ? (
        <h2 className="h-[100px] font-bold text-[1.1rem] flex items-center justify-center text-red-500">
          {message}
        </h2>
      ) : (
        <div className="flex flex-col gap-6  justify-center">
          {UserGroups.map(({ _id, groupImage, groupName }) => {
            return (
              <div
                className="flex items-center gap-4 cursor-pointer group"
                key={_id}
                onClick={() => {
                  dispatch(
                    setOpenGroup({
                      private: false,
                      group: true,
                    })
                  );
                  dispatch(
                    setSelectedGroupDetails({
                      id: _id,
                      groupId: _id,
                      name: groupName,
                      image: groupImage,
                    })
                  );
                  dispatch(showActiveRoom());
                  dispatch(setSearchFilter(""));

                  socket.emit("join_group", {
                    groupId: _id,
                    userId: localStorage.getItem("userId"),
                  });
                }}
              >
                <div className="w-[60px] h-[60px]  md:w-[70px] md:h-[70px] rounded-full overflow-hidden">
                  <img
                    src={groupImage}
                    alt="user-image"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-[0.95rem] md:text-[1.1rem] transition duration-500 group-hover:text-gray-400">
                    {groupName}
                  </h2>
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

export default UserGroups;
