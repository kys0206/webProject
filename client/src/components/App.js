import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import VideoPage from "./views/VideoPage/VideoPage"
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage"
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";

import MyPage from './views/MyPage/MyPage';
import Map from './views/Map/Map';
import PopularDestinations from './views/PopularDestinations/PopularDestinations';
import PostWrite from './views/PostWrite/PostWrite';

import UploadPopularPage from './views/UploadPopularPage/UploadPopularPage';
import DetailPopularPage from './views/DetailPopularPage/DetailPopularPage';

import CartPage from './views/CartPage/CartPage';

import Course from './views/Course/Course';
import UploadCoursePage from './views/UploadCoursePage/UploadCoursePage';
import DetailCoursePage from './views/DetailCoursePage/DetailCoursePage';


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />

          <Route exact path="/videoPage" component={Auth(VideoPage, null)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />

          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route exact path="/map" component={Auth(Map, null)} />
          <Route exact path="/popularDestinations" component={Auth(PopularDestinations, null)} />
          <Route exact path="/postwrite" component={Auth(PostWrite, true)} />

          <Route exact path="/popular/upload" component={Auth(UploadPopularPage, true)} />
          <Route exact path="/popular/:popularId" component={Auth(DetailPopularPage, null)} />
          
          <Route exact path="/course" component={Auth(Course, null)} />
          <Route exact path="/course/upload" component={Auth(UploadCoursePage, true)} />
          <Route exact path="/course/:courseId" component={Auth(DetailCoursePage, null)} />

          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
