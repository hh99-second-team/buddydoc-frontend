import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import PostDetail from '../pages/PostDetail';
import Navbar from '../components/common/Navbar';
import PostCreate from '../pages/PostCreate';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<PostDetail />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
