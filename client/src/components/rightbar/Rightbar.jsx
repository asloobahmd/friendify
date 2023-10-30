import { useContext } from "react";
import "./rightbar.scss";

function Rightbar() {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userinfo">
              <img
                src="https://i.pinimg.com/originals/8d/83/cc/8d83cca65f2b5d74034c781e1dd7911e.jpg"
                alt=""
              />
              <span>John doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.alphacoders.com/957/957128.jpg" alt="" />
              <span>Micheal</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        {/* <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
              <p>
                <span>John doe</span> Changed their profile picture
              </p>
            </div>
            <span> 1 min ago</span>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
              <p>
                <span>John doe</span> Changed their profile picture
              </p>
            </div>
            <span> 1 min ago</span>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
              <p>
                <span>John doe</span> Changed their profile picture
              </p>
            </div>
            <span> 1 min ago</span>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
              <p>
                <span>John doe</span> Changed their profile picture
              </p>
            </div>
            <span> 1 min ago</span>
          </div>
        </div> */}

        {/* <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
              <div className="online"/>
              <span>John doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
              <div className="online"/>
              <span>John doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
              <div className="online"/>
              <span>John doe</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Rightbar;
