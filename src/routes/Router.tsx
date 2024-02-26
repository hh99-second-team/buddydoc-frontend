import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import PostDetail from '../pages/PostDetail';
import Navbar from '../components/common/Navbar';
import PostCreate from '../pages/PostCreate';
import ScrollToTop from '../components/feature/scrollToTop';
import ChatRoom from '../pages/ChatRoom';
import Footer from '../components/common/Footer';
import SearchPage from '../pages/SearchPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<PostDetail />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/search/:word" element={<SearchPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
