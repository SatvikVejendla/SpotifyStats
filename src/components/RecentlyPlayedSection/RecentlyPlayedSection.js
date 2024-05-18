import React, {Component} from 'react';

import './RecentlyPlayedSection.css';


export default class RecentlyPlayedSection extends Component {
    constructor(props){
        super(props);

        let data = this.props.data.items;
        
        let newObj = {};
        for(let i = 0; i < data.length; i++){
            let curDate = new Date(data[i].played_at);
            let yr = curDate.getFullYear();
            let mon = curDate.getMonth();
            let day = curDate.getDate();
            if(newObj[yr] == undefined){
                newObj[yr] = {};
            }
            if(newObj[yr][mon] == undefined){
                newObj[yr][mon] = {};
            }
            if(newObj[yr][mon][day] == undefined){
                newObj[yr][mon][day] = [];
            }
            newObj[yr][mon][day].push(data[i]);
        }

        console.log(newObj);

        this.state = {
            data: newObj,
            keys: Object.keys(newObj),
        }

    }

    render(){
        console.log(this.props.data);
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return (
            <div className="recentsHeader">
                <div className="recentsTitle">Recently Played</div>
                <div className="recentsDescription">Last 50 tracks played</div>
                <div className = "recentsWrapper">
                    {
                        this.state.keys.map(yr => Object.keys(this.state.data[yr]).map(mon => Object.keys(this.state.data[yr][mon]).sort((a,b) => b-a).map(date => {
                            return (
                                <div className="dayEntry">
                                    <div className="dateEntry">
                                        <div className="dateDescriptor">
                                            {(
                                                new Date().getFullYear() == yr && new Date().getMonth() == mon && new Date().getDate() == date)
                                                ? "Today"
                                                : ((
                                                    new Date().getFullYear() == yr && new Date().getMonth() == mon && new Date().getDate()-date == 1) 
                                                    ? "Yesterday"
                                                    : (new Date().getDate() - date) + " days ago"
                                                )
                                            }
                                        </div>
                                        <div className="dateDescriptor">
                                            {months[mon]} {date}, {yr}
                                        </div>
                                    </div>
                                    <div className="playedList">
                                        {
                                            this.state.data[yr][mon][date].map(d => {
                                                return (
                                                    <div>
                                                        <div className="playedTrack">
                                                            <div className="subPlayedTrack">
                                                                <img src={d.track.album.images[0].url} className="playedTrackImage"/>
                                                                <div className="playedTrackInfo">
                                                                    <div className="playedTrackName">{d.track.name}</div>
                                                                    <div className="playedTrackArtist">{d.track.artists[0].name}</div>
                                                                </div>
                                                            </div>
                                                            <div className="timestamp">{new Date(d.played_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
                                                        </div>
                                                        <div className="line"></div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })))
                    }


                </div>
            
            </div>
        );
    }
}