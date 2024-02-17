import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import PostDetail from '../pages/PostDetail';
import TeamPage from '../pages/TeamPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/teampage" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
