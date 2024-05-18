import React, { Component } from 'react';
import { IoDiamondOutline } from "react-icons/io5";
import { GiCrownedSkull } from "react-icons/gi";
import { GiQueenCrown } from "react-icons/gi";

import ArtistSection from '../ArtistSection/ArtistSection.js';
import TrackSection from '../TrackSection/TrackSection.js';
import RecentlyPlayedSection from "../RecentlyPlayedSection/RecentlyPlayedSection.js";
import Footer from "../Footer/Footer.js";

import './Home.css';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      following: {},
      artistData: {
        "Four Weeks": {},
        "Six Months": {},
        "All Time": {},
      },
      trackData: {
        "Four Weeks": {},
        "Six Months": {},
        "All Time": {},
      },
      playlistData: {},
      recentlyPlayed: {},
      stage: 0,
    }

    this.progress = React.createRef();
  }

  resetToken() {
    let token = localStorage.getItem("refresh_token");

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token,
        client_id: this.props.client_id,
      }),
    }).then(res => res.json()).then(body => {
      console.log("TOKEN RECEIVING");
      console.log(body);
    });

  }

  async fetchURL(url){
    let token = localStorage.getItem("auth_token");
    return fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then(res => res.json());
  }
  
  logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  async componentDidMount() {
    let token = localStorage.getItem("auth_token");
    console.log(token);

    let totalRequests = 10;

    const userData = await this.fetchURL("https://api.spotify.com/v1/me");
    console.log(`1/${totalRequests}`);
    this.setState({stage: 1});


    const following = await this.fetchURL("https://api.spotify.com/v1/me/following?type=artist&limit=50");
    console.log(`2/${totalRequests}`);
    this.setState({stage: 2});

    let fourWeeks = await this.fetchURL("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term");
    fourWeeks = fourWeeks.items.map(i => {
      return i.images[i.images.length-1].url;
    });
    fourWeeks = {items: fourWeeks};
    console.log(`3/${totalRequests}`);
    this.setState({stage: 3});

    let sixMonths = await this.fetchURL("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term");
    sixMonths = sixMonths.items.map(i => {
      return i.images[i.images.length-1].url;
    });
    sixMonths = {items: sixMonths};
    console.log(`4/${totalRequests}`);
    this.setState({stage: 4});

    let allTime = await this.fetchURL("https://api.spotify.com/v1/me/top/artists?limit=5&time_range=long_term");
    allTime = allTime.items.map(i => {
      return i.images[i.images.length-1].url;
    });
    allTime = {items: allTime};
    console.log(`5/${totalRequests}`);
    this.setState({stage: 5});

    let fourWeeksTracks = await this.fetchURL("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term");
    console.log(`6/${totalRequests}`);
    this.setState({stage: 6});
    let sixMonthsTracks = await this.fetchURL("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term");
    console.log(`7/${totalRequests}`);
    this.setState({stage: 7});
    let allTimeTracks = await this.fetchURL("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term");
    console.log(`8/${totalRequests}`);
    this.setState({stage: 8});
    let playlists = await this.fetchURL("https://api.spotify.com/v1/me/playlists?limit=50");
    console.log(`9/${totalRequests}`);
    this.setState({stage: 9});
    let recents = await this.fetchURL("https://api.spotify.com/v1/me/player/recently-played?limit=50");
    console.log(`10/${totalRequests}`);

    

    this.setState({
      userData: userData,
      following: following,
      artistData: {
        "Four Weeks": fourWeeks,
        "Six Months": sixMonths,
        "All Time": allTime,
      },
      trackData: {
        "Four Weeks": fourWeeksTracks,
        "Six Months": sixMonthsTracks,
        "All Time": allTimeTracks,
      },
      playlistData: playlists,
      recentlyPlayed: recents,
      stage: 10,
    
    });


  }
  render() {
    console.log(this.state);
    if(this.state.stage == 10){
      return (
        <div className="root">
          <div className="header rootH">
            <div className="logout" onClick={this.logout}>Log out</div>
            <div className="headerBox">
              <img className="profile" src={this.state.userData.images ? this.state.userData.images[this.state.userData.images.length-1].url : ""} alt="Profile" />
              <div className="profileName">
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <div className="accountName">{this.state.userData.display_name}</div>
                  {
                    this.state.userData.product == "premium" ? <GiQueenCrown size={35} style={{marginLeft: "10px", flexShrink: 0}}/> : null
                  }
                </div>
                <div className="numPlaylists">{this.state.playlistData.total} Playlists</div>
                <div className="followers">
                  <p>{this.state.userData.followers.total} Followers</p>
                  <p>&nbsp;&nbsp;•&nbsp;&nbsp;</p>
                  <p>{this.state.following.artists.total} Following</p>
                </div>
              </div>
            </div>

          </div>
          <div className="mainBackground">
            <div className="artistsSection">
              <ArtistSection data={this.state.artistData}/>
              <TrackSection data={this.state.trackData}/>
              <RecentlyPlayedSection data={this.state.recentlyPlayed}/>
              <Footer/>

            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="root">
          <img src={require('../../headphonesbackground.png')} alt="Profile" />
          <div className="progress">Fetching endpoints {this.state.stage}/10...</div>
          <div className="progressBackground"></div>
          <div ref={this.progress} className="progressBar" style={{width: this.state.stage*3 + "%"}}></div>
        </div>
      );
    }
  }
}