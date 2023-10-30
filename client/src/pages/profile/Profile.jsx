import "./profile.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

function Profile() {
  const [showModal, setShowModal] = useState(false);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { currentUser } = useContext(AuthContext);

  const { data: user, refetch } = useQuery(["user"], async () => {
    return await axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.data);
  });

  const { data: RelationShipData } = useQuery(["relationships"], async () => {
    return await axios
      .get(`http://localhost:5000/api/relations?userId=${userId}`)
      .then((res) => res.data);
  });

  useEffect(() => {
    refetch();
  }, [userId]);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return axios.delete(
          `http://localhost:5000/api/relations?userId=${userId}`,
          { withCredentials: true }
        );
      return axios.post(
        "http://localhost:5000/api/relations",
        { userId },
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("relationships");
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(RelationShipData?.includes(currentUser.id));
  };

  return (
    <div className="profile">
      <div className="images">
        <img src={`../../public/${user?.coverPic}`} className="cover" />
        <img src={`../../public/${user?.profilePic}`} className="dp" />
      </div>
      <div className="profileContainer">
        <div className="uinfo">
          <div className="left">
            <a href="">
              <FacebookIcon fonstsize="large" />
            </a>
            <a href="">
              <InstagramIcon fonstsize="large" />
            </a>
            <a href="">
              <TwitterIcon fonstsize="large" />
            </a>
            <a href="">
              <LinkedInIcon fonstsize="large" />
            </a>
            <a href="">
              <PinterestIcon fonstsize="large" />
            </a>
          </div>
          <div className="center">
            <span>{user?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user?.website}</span>
              </div>
            </div>
            {currentUser.id === userId ? (
              <button onClick={() => setShowModal(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {RelationShipData?.includes(currentUser.id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} user={user} />
      </div>
      {showModal && <Update setShowModal={setShowModal} user={user} />}
    </div>
  );
}

export default Profile;
