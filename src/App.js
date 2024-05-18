import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Outlet, Link, BrowserRouter, Navigate, useSearchParams } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import {Buffer} from 'buffer';


import Home from './components/Home/Home.js';


const client_id = "INSERT ID HERE";
const client_secret = "INSERT SECRET HERE";

function SplashScreen() {
  return (
    <div className="background">
      <img src={require('./headphonesbackground.png')} className="App-logo" alt="logo" />

      <Link to="/authorize">
        <FaSpotify className="authorize"></FaSpotify>
      </Link>

    </div>
  );
}


class CallbackClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedCode: false,
      database: false,
      token: false,
    }

    console.log(client_id);
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (this.state.receivedCode == false && this.state.database == false && this.state.token == false) {
      this.setState({receivedCode: true, database: false, token: false});
      const buffer = new Buffer.from(client_id + ':' + client_secret).toString('base64');
  
      fetch("http://localhost:8000/request", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'code': code
        }
      }).then(res => res.json()).then(body => {
        this.setState({receivedCode: true, database: true, token: false});

        if(body.token != -1) {
          this.setState({receivedCode: true, database: true, token: true});
  
        } else {
          fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: new URLSearchParams({
              code: code,
              redirect_uri: "http://localhost:3000/callback",
              grant_type: 'authorization_code'
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
          }).then(res => res.json()).then(body => {
  
            let token = body.access_token;
            let refresh_token = body.refresh_token;
  
            fetch("http://localhost:8000/authorize", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'code': code,
                'token': token,
                'refresh_token': refresh_token,
              }
            }).then(body => {
              
              this.setState({receivedCode: true, database: true, token: true});
              localStorage.setItem('auth_token', token);
              localStorage.setItem('refresh_token', refresh_token);
            });
            
          });
  
        }
      })
    }
    
  }

  render() {
    if (this.state.token) {
      return (
        <div>
          <Navigate to="/home" />
        </div>
      );
    } else {
      return (
        <div>
          <h1>LOADING...</h1>
        </div>
      );
    }
  
  }
}

function NoMatch() {
  return (
    <Navigate to="/" replace />
  );
}

function App() {
  console.log(process.env);
  return (
    <BrowserRouter>
    <div>
      <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="authorize" Component={() => {
            let scopes = "user-top-read user-read-private user-read-email playlist-read-private playlist-read-collaborative streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-follow-read user-read-recently-played";
            window.location.href = "https://accounts.spotify.com/authorize?response_type=code&scope=" + encodeURIComponent(scopes) + "&client_id=" + encodeURIComponent(client_id) + "&redirect_uri=http://localhost:3000/callback";
            return null;
          }}/>
          <Route path="callback" element={<CallbackClass />} />
          <Route path="home" element={<Home/>} />


      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
