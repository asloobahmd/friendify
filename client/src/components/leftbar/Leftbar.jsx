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
              {currentUser.profilePic ? (
                <img src={`../../public/${currentUser.profilePic}`} alt="" />
              ) : (
                <img
                  src="https://i.pinimg.com/236x/02/72/35/02723528ae01d17bbf67ccf6b8da8a6b.jpg"
                  alt=""
                />
              )}
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
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
