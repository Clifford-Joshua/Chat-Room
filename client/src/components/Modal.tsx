import axios, { AxiosError } from "axios";
import styled from "styled-components";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { setCreateGroup } from "../Feature/userSlice";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
  _id: string;
  username: string;
}

const Modal = () => {
  const dispatch = useDispatch();
  const [users, setUser] = useState<User[]>([]);
  const [message, setMessage] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [groupImage, setGroupImage] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);

      const { users } = res.data;

      setUser(users);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      console.log(error.response);
      if (error.response) {
        toast.error(error.response.data.message || "server error");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  });

  const uploadImage = async (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (!target.files) {
      toast.error("image is null");
      return;
    }

    const imageFile = target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setLoading(true);
      setMessage("Uploading image...");
      const response = await axios.post(
        `${API_URL}/groups/groupImage`,
        formData
      );

      const { imageUrl } = response.data;

      setGroupImage(imageUrl);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling
      console.log(error.response);
      if (error.response) {
        toast.error(error.response.data.message || "No file uploaded");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!groupName || !groupImage) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("Creating Group..");

      const res = await axios.post(
        `${API_URL}/groups/create-Group`,
        {
          groupName: groupName,
          groupImage: groupImage,
          members: members,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { msg } = res.data;

      toast.success(msg);
      dispatch(setCreateGroup());
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      // ✅ Error handling

      if (error.response) {
        toast.error(error.response.data.message || "unable to create group");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper className="w-full h-full absolute top-0 left-0 z-999 backdrop-blur-xl flex justify-center items-center">
      <div
        className="absolute right-[3%] top-[3%] text-[1.6rem] font-bold cursor-pointer transition duration-700 hover:text-red-600"
        onClick={() => dispatch(setCreateGroup())}
      >
        <IoMdClose />
      </div>

      <div className="flex flex-col gap-4 w-[90%] p-4 rounded-[10px] border md:w-[75%] lg:w-[40%]">
        <h2 className="text-[1.4rem] font-bold cursor-pointer  hover:text-gray-400 transition duration-700">
          Create Group
        </h2>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* ======================================================================================== */}
          {/* Group name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="groupName"
              className="font-bold flex items-center gap-2"
            >
              GroupName <span className="text-red-600 text-[1.1rem]">*</span>
            </label>
            <input
              type="text"
              name="groupName"
              id="groupName"
              value={groupName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setGroupName(e.target.value);
              }}
              className="border w-full rounded-[10px] h-10 p-2 outline-none text-[0.9rem]"
            />
          </div>

          {/* ========================================================================================== */}
          {/* Group Image */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="groupImage"
              className="font-bold flex items-center gap-2"
            >
              GroupImage <span className="text-red-600 text-[1.1rem]">*</span>
            </label>
            <input
              type="file"
              name="groupImage"
              id="groupImage"
              onChange={uploadImage}
              className="border w-full rounded-[10px] h-10 p-2 outline-none text-[0.9rem]"
            />
          </div>

          {/* ======================================================================================== */}
          {/* Select members */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Add Members</h2>

            <div>
              {users
                ?.filter(
                  (user) => user.username !== localStorage.getItem("username")
                )
                .map(({ username, _id }) => {
                  return (
                    <div className="flex items-center gap-2" key={_id}>
                      <input
                        id="members"
                        type="checkbox"
                        name="members"
                        value={username}
                        className="size-4"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) {
                            setMembers((prev) => [...prev, e.target.value]);
                          } else {
                            setMembers((prev) =>
                              prev.filter((member) => member !== e.target.value)
                            );
                          }
                        }}
                      />
                      <label htmlFor="members">{username}</label>
                    </div>
                  );
                })}
            </div>
          </div>

          <button
            className={`border mt-2 p-2 cursor-pointer transition duration-700 font-bold hover:bg-orange-600 ${
              loading && "text-gray-800 animate-pulse"
            }`}
            disabled={loading}
          >
            {loading ? message : "Create Group"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Modal;
