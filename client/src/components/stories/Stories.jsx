import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";

function Stories() {
  const { currentUser } = useContext(AuthContext);

  const stories = [
    {
      id: 1,
      name: "vijay",
      img: "https://igimages.gumlet.io/tamil/home/leo260623_2.jpg?w=376&dpr=2.6",
    },
    {
      id: 2,
      name: "Virat kohli",
      img: "https://w0.peakpx.com/wallpaper/429/506/HD-wallpaper-best-virat-kohli-collage-king-kohli-sports.jpg",
    },
    {
      id: 3,
      name: "cr7",
      img: "https://pbs.twimg.com/media/FvSjjLracAQa6lh.jpg:large",
    },
    {
      id: 4,
      name: "john",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskMTbFMxjO4KcWzw0NcjXs1ne_YHF5yuEKrX9fy-DbZErosHHiEaiJjR97bCyLI1j_BM&usqp=CAU",
    },
    {
      id: 5,
      name: "cristiano",
      img: "https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1660621842/1660621841.jpg",
    },
    {
      id: 6,
      name: "jhon doe",
      img: "https://staticg.sportskeeda.com/editor/2023/08/e3013-16919512943412-1920.jpg?w=840",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories;
