import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [userClicked, setUserClicked] = useState(false);

  const queryClient = useQueryClient();

  const logoutMutation = useMutation(
    () => {
      return axios.post("/api/auth/logout");
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
        setCurrentUser(null);
      },
    }
  );

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const delMutation = useMutation(
    () => {
      return axios.delete("http://localhost:5000/api/users/", {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
        setCurrentUser(null);
      },
    }
  );

  const handleDel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your account will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        delMutation.mutate();
        Swal.fire("Your Friendify account has been deleted!");
      }
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/users?q=" + searchQuery,
        { withCredentials: true }
      );
      setUsers(res.data);
    };
    fetchUsers();
  }, [searchQuery]);

  const handleUserClick = () => {
    // setUserClicked(true);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Friendify</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.length > 0 && (
            <CloseIcon className="closei" onClick={clearSearch} />
          )}
          {searchQuery.length > 0 && !userClicked && (
            <div className="search-results">
              {users.length > 0 ? (
                users?.map((user, index) => (
                  <Link
                    to={`profile/${user.id}`}
                    className="link"
                    onClick={handleUserClick}
                    key={index}
                  >
                    <div className="user">
                      <img src={`../../public/${user.profilePic}`} alt="" />
                      <div className="names">
                        <span>{user.username}</span>
                        <p>{user.name}</p>
                      </div>
                      <ArrowForwardIcon className="arrow" />
                    </div>
                  </Link>
                ))
              ) : (
                <span>No users available!</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="right">
        {/* <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon /> */}
        <div className="user">
          <img src={`../../public/${currentUser.profilePic}`} alt="" />
          <div
            className="name"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span>{currentUser.name}</span>
            <KeyboardArrowDownIcon className="dwnarrow" />
            {isHovering && (
              <div className="listModal">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleDel}>Delete Account</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
