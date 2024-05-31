import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../../context/authContext";
import "./update.scss";

function Update({ setShowModal, user }) {
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  const [name, setName] = useState(user.name ? user.name : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [city, setCity] = useState(user.city ? user.city : "");
  const [website, setWebsite] = useState(user.website ? user.website : "");

  const { setCurrentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (updatePost) => {
      return axios.put("http://localhost:5000/api/users", updatePost, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries("user");
      },
    }
  );

  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSub = async (e) => {
    e.preventDefault();

    const profileUrl = profile ? await upload(profile) : user.profilePic;
    const coverUrl = cover ? await upload(cover) : user.coverPic;

    const data = {
      name: name,
      email: email,
      city: city,
      website: website,
      profilePic: profileUrl,
      coverPic: coverUrl,
    };

    updateMutation.mutate(data);
    setCurrentUser({ ...data, id: user.id, username: user.username });
    setShowModal(false);
  };

  return (
    <div className="update">
      <button onClick={() => setShowModal(false)}>X</button>
      <form>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="inputGroup">
          <label htmlFor="">Profile Pic</label>
          <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        </div>
        <div className="inputGroup">
          <label htmlFor="">Cover Pic</label>
          <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        </div>
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button onClick={handleSub}>Update</button>
      </form>
    </div>
  );
}

export default Update;
