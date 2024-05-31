import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Postupdate from "../postupdate/Postupdate";

function Post({ post }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const postId = post.id;

  const { data: likeData } = useQuery(["likes", postId], async () => {
    const res = await axios.get(
      `http://localhost:5000/api/likes?postId=${postId}`
    );
    return res.data;
  });

  // Check if the current user's ID exists in the likesData array
  const likedByCurrentUser = likeData?.some((like) => like === currentUser.id);

  const { data: commentData } = useQuery(["commdata", postId], async () => {
    const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
    return res.data;
  });

  const addLikemutation = useMutation(
    async (postId) => {
      return await axios.post(
        "http://localhost:5000/api/likes",
        { postId },
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("likes");
      },
    }
  );

  const addLike = async () => {
    try {
      await addLikemutation.mutateAsync(postId);
    } catch (error) {
      onsole.log(error);
    }
  };

  const removeLikemutation = useMutation(
    async (postId) => {
      return await axios.delete(
        "http://localhost:5000/api/likes?postId=" + postId,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("likes");
      },
    }
  );

  const RemoveLike = async () => {
    try {
      await removeLikemutation.mutateAsync(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const delPostMutation = useMutation(
    async (postId) => {
      return await axios.delete(
        "http://localhost:5000/api/posts?postId=" + postId,
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

  const handleDel = () => {
    delPostMutation.mutateAsync(postId);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <Link
            to={`/profile/${post.userId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="userinfo">
              {post.user?.profilePic ? (
                <img src={`../../public/${post.user?.profilePic}`} alt="" />
              ) : (
                <img
                  src="https://i.pinimg.com/236x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg"
                  alt=""
                  className="dp"
                />
              )}
              <div className="details">
                <span className="name">{post.user?.name}</span>
                <span className="date">{moment(post.createdAt).fromNow()}</span>
              </div>
            </div>
          </Link>
          {post.userId === currentUser.id && (
            <MoreHorizIcon
              className="dots"
              onClick={() => setshowModal(true)}
            />
          )}
          {showModal && (
            <div className="listModal" onMouseLeave={() => setshowModal(false)}>
              <button onClick={() => setShowUpdateModal(true)}>
                Edit Post
              </button>
              <button onClick={handleDel}>Delete Post</button>
            </div>
          )}
        </div>
        <div className="content">
          <div className="desc">{post.desc}</div>
          <img src={`../../public/${post.img}`} alt="" />
        </div>
        <div className="info">
          <div className="itemlike">
            <div className="icon">
              {likedByCurrentUser ? (
                <FavoriteIcon style={{ color: "red" }} onClick={RemoveLike} />
              ) : (
                <FavoriteBorderOutlinedIcon onClick={addLike} />
              )}
            </div>
            {likeData?.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentData?.length} comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            share
          </div> */}
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
      {showUpdateModal && (
        <Postupdate setShowUpdateModal={setShowUpdateModal} post={post} />
      )}
    </div>
  );
}

export default Post;
