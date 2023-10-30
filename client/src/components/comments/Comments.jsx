import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "react-query";

function Comments({ postId }) {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["comments"], async () => {
    return axios
      .get("http://localhost:5000/api/comments?postId=" + postId)
      .then((res) => res.data);
  });

  const addMutation = useMutation(
    (comment) => {
      return axios.post("http://localhost:5000/api/comments", comment, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("comments");
        queryClient.invalidateQueries("commdata");
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await addMutation.mutateAsync({ desc, postId });
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMutation = useMutation(
    (commentId) => {
      return axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("comments");
        queryClient.invalidateQueries("commdata");
      },
    }
  );

  const handleDel = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={`../../public/${currentUser.profilePic}`} alt="" />
        <input
          type="text"
          placeholder="Write a somment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {data?.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={`../../public/${currentUser.profilePic}`} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          {comment.userId === currentUser.id && (
            <button onClick={() => handleDel(comment.id)}>delete</button>
          )}
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
}

export default Comments;
