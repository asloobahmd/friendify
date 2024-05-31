import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "react-query";

function Posts({ userId }) {
  const { data, isLoading } = useQuery(["posts"], async () => {
    const url = userId
      ? `http://localhost:5000/api/posts?userId=${userId}`
      : `http://localhost:5000/api/posts`;
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    return data;
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="posts">
      {data?.length != 0 &&
        data?.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
}

export default Posts;
