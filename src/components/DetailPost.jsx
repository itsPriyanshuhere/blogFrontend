import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { server } from "../main";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randomImageUrl, setRandomImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [updatingComments, setUpdatingComments] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${server}/post/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  useEffect(() => {
    const getRandomImageUrl = () => {
      const randomImageUrl = `https://source.unsplash.com/random/800x600/?nature,water,landscape&${Math.random()}`;
      return randomImageUrl;
    };

    setRandomImageUrl(getRandomImageUrl());
  }, [randomImageUrl]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) {
      setCommentError("Please enter both username and comment.");
      return;
    }

    try {
      setUpdatingComments(true);
      const response = await axios.put(`${server}/post/${id}`, {
        username,
        comment,
      });
      setPost(response.data.updatedBlog);
      setUsername("");
      setComment("");
      setCommentError("");
      setUpdatingComments(false);
    } catch (error) {
      console.error("Error posting comment:", error);
      setUpdatingComments(false);
    }
  };

  if (loading) return <Spinner message="Loading post details..." />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-red-200 text-black flex justify-center items-center">
      <div className="container mx-auto py-8 ">
        <h1 className="text-3xl font-semibold text-white mb-6 ">Post Details</h1>
        {post ? (
          <div className="p-8 mr-[12rem] rounded-lg shadow-lg w-[50rem] items-center bg-white mb-8">
            <div className="flex items-center justify-center mb-6">
              <img src={post.image} alt={post.address} className="w-64 h-64 object-cover rounded-lg" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{post.address}</h2>
            <p className="text-gray-800 mb-4">{post.content}</p>
          </div>
        ) : (
          <p>No post details found.</p>
        )}

        <div className="p-8 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {post.comments && post.comments.length > 0 ? (
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{comment.username}: </span>
                  <span>{comment.comment}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
            {commentError && <p className="text-red-500">{commentError}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={updatingComments}
            >
              {updatingComments ? "Submitting..." : "Submit Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
