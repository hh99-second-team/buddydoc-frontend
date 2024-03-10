import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/main/Main';
import MyPage from '../pages/myPages/MyPage';
import PostDetail from '../pages/postDetail/PostDetail';
import TeamPage from '../pages/team/TeamPage';
import Navbar from '../components/navbar/Navbar';
import PostCreate from '../pages/postCreate/PostCreate';
import ScrollTop from '../components/ScrollToTop';
import ChatPage from '../pages/chatPage/ChatPage';
import Footer from '../components/Footer';
import SearchPage from '../pages/searchPage/SearchPage';
import OauthCallBack from '../pages/oauthCallBack/OauthCallBack';
import PostModify from '../pages/postModify/PostModify';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

const Router = () => {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <motion.div initial={animate.initial} animate={animate.animate} exit={animate.exit}>
          <Navbar />
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/create" element={<PostCreate />} />
            <Route path="/modify/:postId" element={<PostModify />} />
            <Route path="/mypage/:tabType" element={<MyPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/search/:search" element={<SearchPage />} />
            <Route path="/callback" element={<OauthCallBack />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </motion.div>
      </AnimatePresence>
    </BrowserRouter>
  );
};

const animate = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: { transform: { duration: 0.33, ease: 'easeInOut' } },
  },
  animate: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: { transform: { duration: 0.33, ease: 'easeInOut' } },
  },
  exit: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: { transform: { duration: 0.33, ease: 'easeInOut' } },
  },
};

export default Router;
