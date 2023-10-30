import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./leftbar.scss";

function Leftbar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <Link to={`/profile/${currentUser.id}`} className="link">
            <div className="user">
              <img src={`../../public/${currentUser.profilePic}`} alt="" />
              <span>{currentUser.name}</span>
            </div>
          </Link>
          <div className="item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UBG8BF1FAP4kqFxD1Le1ROvUW6-4UymX9Q&usqp=CAU"
              alt=""
            />
            <span>Friends</span>
          </div>
          <div className="item">
            <img
              src="https://digitalmarketingphilippines.com/wp-content/uploads/2014/10/social-media-groups.jpg"
              alt=""
            />
            <span>Groups</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
