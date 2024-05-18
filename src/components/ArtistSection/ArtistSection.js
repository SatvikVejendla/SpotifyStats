import React, { Component } from 'react';

import "./ArtistSection.css";

export default class ArtistSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selection: 0,
        };

        this.setSelection = this.setSelection.bind(this);
        this.input1 = React.createRef();
        this.input2 = React.createRef();
        this.input3 = React.createRef();
    }

    async setSelection(e){
        let options = ["Four Weeks", "Six Months", "All Time"];
        let newSelection = options.indexOf(e.target.value);
        let oldSelection = this.state.selection;

        if(newSelection != oldSelection){

            if(oldSelection == 0){
                this.input1.current.className = "transition";
                if(newSelection == 1){
                    this.input2.current.className = "";
                } else if(newSelection == 2){
                    this.input2.current.className = "";
                    setTimeout(function() {
                            
                        this.input3.current.className = "transition";
                        this.input2.current.className = "transitionRight";
                        
                    }.bind(this), 100);
                }
            } else if(oldSelection == 1){
                if(newSelection == 0){
                    this.input2.current.className = "transitionLeft";
                    this.input1.current.className = "";
                } else if(newSelection == 2){
                    this.input2.current.className = "transitionRight";
                    this.input3.current.className = "transition";
                }
            } else if(oldSelection == 2){
                this.input3.current.className = "";
                if(newSelection == 1){
                    this.input2.current.className = "";
                } else if(newSelection == 0){
                    this.input2.current.className = "";
                    setTimeout(function() {
                        
                        this.input2.current.className = "transitionLeft";
                        this.input1.current.className = "";
                        
                    }.bind(this), 100);
                    
                }

            }
        }

        

        this.setState({selection: newSelection});
    }

    componentDidMount() {
        this.setSelection({target: {value: "Four Weeks"}});

        this.input1.current.className = "";
        this.input2.current.className = "transitionLeft";
    }


    render() {
        let images = ["", "", "", "", ""];
        let options = ["Four Weeks", "Six Months", "All Time"];

        console.log(this.props.data);
        images = this.props.data["Four Weeks"].items;
        return (
        <div className="artistHeader">
            <div className="artistSubHeader">
                <div className="selectorBox">
                    <input type="radio" id="radio1" name="timePeriod" value="Four Weeks" onClick={this.setSelection} defaultChecked/>
                    <label ref={this.input1} for="radio1">4 Weeks</label>
                    <input type="radio" id="radio2" name="timePeriod" value="Six Months" onClick={this.setSelection}/>
                    <label ref={this.input2}for="radio2">6 Months</label>
                    <input type="radio" id="radio3" name="timePeriod" value="All Time"onClick={this.setSelection}/>
                    <label  ref={this.input3} for="radio3">All Time</label>
                </div>
                <div className="artistIconsOuter">
                    <div className="header">

                        <img src={this.props.data[options[this.state.selection]].items[0]} className="top top1" alt="artistImage" />
                        <img src={this.props.data[options[this.state.selection]].items[1]} className="top top2" alt="artistImage" />
                        <img src={this.props.data[options[this.state.selection]].items[2]} className="top top3" alt="artistImage" />
                        <img src={this.props.data[options[this.state.selection]].items[3]} className="top top4" alt="artistImage" />
                        <img src={this.props.data[options[this.state.selection]].items[4]} className="top top5" alt="artistImage" />

                    </div>
                </div>
            </div>
        </div>
        )
    }
}