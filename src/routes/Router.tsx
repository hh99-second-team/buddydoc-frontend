import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import PostDetail from '../pages/PostDetail';
import Navbar from '../components/common/Navbar';
import PostCreate from '../pages/PostCreate';
import ScrollToTop from '../components/feature/scrollToTop';
import ChatPage from '../pages/ChatPage';
import Footer from '../components/common/Footer';
import SearchPage from '../pages/SearchPage';
import OauthCallBack from '../pages/OauthCallBack';
import PostModify from '../pages/PostModify';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:postId" element={<PostDetail />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/modify/:postId" element={<PostModify />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/search/:search" element={<SearchPage />} />
        <Route path="/callback" element={<OauthCallBack />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
