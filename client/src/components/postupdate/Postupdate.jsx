import axios from "axios";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../../context/authContext";
import "./postupdate.scss";

function Postupdate({ setShowUpdateModal, post }) {
  const [desc, setDesc] = useState(post.desc ? post.desc : "");

  const queryClient = useQueryClient();

  const editPostMutation = useMutation(
    async (updPost) => {
      return await axios.put(
        "http://localhost:5000/api/posts?postId=" + post.id,
        updPost,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const handleEdit = (e) => {
    e.preventDefault();
    editPostMutation.mutateAsync({ desc: desc });
    setShowUpdateModal(false);
  };

  return (
    <div className="update">
      <button onClick={() => setShowUpdateModal(false)}>X</button>
      <form>
        <input
          type="text"
          placeholder="type description..."
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleEdit}>Update Post</button>
      </form>
    </div>
  );
}

export default Postupdate;
