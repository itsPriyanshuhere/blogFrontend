/* eslint-disable no-undef */
import "./App.css";
// import axios from "axios";
// import { server } from "./main";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import AllPosts from "./components/AllPosts";
import DetailPost from "./components/DetailPost";

function App() {
  // const hey = async () => {
  //   const res = await axios.get(`${server}/posts`);

  //   console.log(res.data.data);
  // };


  return (
    <div>
    <Routes>
      <Route path='/' element={<CreatePost />} />
      <Route path='/viewAll' element={<AllPosts />} />
      <Route path='/detail/:id' element={<DetailPost />} />
      <Route path="*" element={<AllPosts />} />
    </Routes>
    </div>
  );
}

export default App;
