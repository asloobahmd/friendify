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
    return <h3>Loading</h3>;
  }

  return (
    <div className="comments">
      <div className="write">
        {currentUser.profilePic ? (
          <img src={`../../public/${currentUser.profilePic}`} alt="" />
        ) : (
          <img
            src="https://i.pinimg.com/236x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg"
            alt=""
          />
        )}
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
          {comment.profilePic ? (
            <img src={`../../public/${comment.profilePic}`} alt="" />
          ) : (
            <img
              src="https://i.pinimg.com/236x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg"
              alt=""
              className="dp"
            />
          )}

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
