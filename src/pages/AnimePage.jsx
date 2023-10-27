import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/API_URL";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// import {useComment} from '../hooks/useComment';

const AnimePage = () => {
  const [anime, setAnime] = useState(null);
  const [comment, setComment] = useState("");
  const [toggleEdit, setToggleEdit] = useState({
    state: false,
    index: null,
    comment: "",
  });
  const { id } = useParams();
  const { user } = useAuthContext();
  console.log(id);
  useEffect(() => {
    user &&
      axios
        .get(`${API_URL}/anime/${id}`, {
          headers: {
            authorization: `Bearer ${user.authToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setAnime(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const updatedAnime = await useComment(comment, id);
  //     setAnime(updatedAnime);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      API_URL + `/anime/${id}/comment/add`,
      { comment },
      {
        headers: {
          authorization: `Bearer ${user.authToken}`,
        },
      }
    );
    console.log("response after creatin comment 💻", response);
    setAnime(response.data);
  };

  const handleDelete = async (commentId) => {
    try {
      const updatedAnime = await axios.delete(API_URL + `/anime/${id}/comment/${commentId}/delete`, {
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });
      setAnime(updatedAnime.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async (commentId) => {
    const response = await axios.put(
      API_URL + `/anime/${id}/comment/${commentId}/edit`,
      { comment: toggleEdit.comment },
      { headers: { Authorization: `Bearer ${user.authToken}` } }
    );
    setToggleEdit({state: false, comment: '', index: null})
    setAnime(response.data)
  };
  return (
    anime && (
      <div className="comment-main-div">
        <img className="comment-img" src={anime.img} alt="image" />
        <h1 className="comment-header">{anime.name}</h1>
        { anime.comments &&
          anime.comments.map((comment, index) => {
            return (
              <div className="container" key={index}>
                {toggleEdit.state && toggleEdit.index === index ? (
                  <div className="comment-edit-div">
                    <input
                      className="search-inp"
                      type="text"
                      value={toggleEdit.comment}
                      onChange={(e) =>
                        setToggleEdit({
                          ...toggleEdit,
                          comment: e.target.value,
                        })
                      }
                    />
                    <button className="search-btn" onClick={() => handleEditComment(comment._id)}>
                    ☑️
                    </button>
                  </div>
                ) : (
                  <div className="comment">{comment.text}</div>
                )}

                {user._id === comment.owner && (
                  <div className="comment-btn-div">
                    <button className="comment-btn-delete" onClick={() => handleDelete(comment._id)}>
                      🗑️
                    </button>
                    <button
                      className="comment-btn"
                      onClick={() =>
                        setToggleEdit({
                          state: !toggleEdit.state,
                          index: index,
                          comment: comment.text,
                        })
                      }
                    >
                      ✏️
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        <form onSubmit={handleSubmit}>
          <input className="search-inp" type="text" onChange={(e) => setComment(e.target.value)} />
          <button className="search-btn" type="submit">Add</button>
        </form>
      </div>
    )
  );
};

export default AnimePage;
