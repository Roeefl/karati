import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';
import withLanguage from './withLanguage';
import { getString } from '../locale';

import Header from './header/Header';
import Footer from './footer/Footer';

import Book from './books/Book';

import MyShelf from './shelf/MyShelf';
import SearchBooks from './shelf/SearchBooks';
import SearchBookExpanded from './shelf/SearchBookExpanded';

import MyProfile from './profile/MyProfile';
import Infographics from './profile/Infographics';

import MyWishlist from './wishlist/MyWishlist';

import MySettings from './profile/MySettings';
import MySwipes from './swipes/MySwipes';
import MyProposals from './proposals/MyProposals';

import MyMatches from './matches/MyMatches';
import MatchesWithUser from './matches/MatchesWithUser';

import Browse from './books/Browse';
import Swipe from './books/Swipe';

import FrontPage from './frontpage/FrontPage';
import Intro from './frontpage/Intro';
import CompHeader from './header/CompHeader';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.setupUserGeolocation();
    this.props.setupPusher();
    this.props.setupSentry();
  }

  render() {
    const {
      userData
    } = this.props;

    return (
      <div className={`app-container ${this.props.direction}`}>
        <BrowserRouter>
          <div>
            <Header />

            <main>
              <Route
                exact
                path="/"
                component={() =>
                  // userData &&
                  // !userData.error &&
                  // !userData.passedIntro ? (
                  //   <Redirect to="/intro" />
                  // ) : (
                    <FrontPage />
                  // )
                }
              />

              <div className="route-container">
                <CompHeader header={this.props.currentComponent} />

                <Route path="/intro" component={Intro} />

                <Route exact path="/myShelf" component={MyShelf} />
                <Route exact path="/myShelf/search" component={SearchBooks} />
                <Route
                  path="/myShelf/search/book/:bookId"
                  component={SearchBookExpanded}
                />

                <Route exact path="/myMatches" component={MyMatches} />
                <Route
                  exact
                  path="/myMatches/:userId"
                  component={MatchesWithUser}
                />

                <Route path="/myProfile" component={MyProfile} />
                <Route path="/stats" component={Infographics} />
                <Route path="/mySettings" component={MySettings} />

                <Route path="/mySwipes" component={MySwipes} />
                <Route path="/myProposals" component={MyProposals} />
                <Route path="/myWishlist" component={MyWishlist} />

                <Route path="/books/browse" component={Browse} />
                <Route path="/books/swipe" component={Swipe} />

                <Route path="/book/:bookId" component={Book} />
              </div>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userData,
    currentComponent: state.currentComponent
  };
}

export default connect(
  mapStateToProps,
  actions
)(withLanguage(App));
