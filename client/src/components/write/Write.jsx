import "./write.scss";
import ImageIcon from "@mui/icons-material/Image";
import PlaceIcon from "@mui/icons-material/Place";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "react-query";

function Write() {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return axios.post("http://localhost:5000/api/posts", newPost, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc && !file) {
      Swal.fire({
        title: "You cant Upload empty post",
        text: "Type something or Add a photo!",
        icon: "warning",
        confirmButtonText: "Cool",
      });
      return;
    }
    const imaegUrl = file ? await upload() : null;
    mutation.mutate({ desc, img: imaegUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="write">
      <div className="container">
        <div className="top">
          <div className="left">
            {currentUser.profilePic ? (
              <img src={currentUser.profilePic} alt="" />
            ) : (
              <img
                src="https://i.pinimg.com/236x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg"
                alt=""
              />
            )}
            <textarea
              placeholder={`What's on your mind ${currentUser.name}?`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          {file && (
            <div className="right">
              <img src={URL.createObjectURL(file)} alt="" />
            </div>
          )}
        </div>
        <hr />
        <div className="bottom">
          <div className="inputs">
            <div className="inputgrp">
              <ImageIcon />
              <label htmlFor="img">Add Image</label>
              <input
                id="img"
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="inputgrp">
              <PlaceIcon />
              <span>Add Place</span>
            </div>
            <div className="inputgrp">
              <GroupAddIcon />
              <span>Tag Friends</span>
            </div>
          </div>

          <button
            style={{ cursor: !desc && !file ? "auto" : "pointer" }}
            onClick={handleClick}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Write;
