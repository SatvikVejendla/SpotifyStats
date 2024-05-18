import React, {Component} from 'react';
import { VscTriangleRight, VscTriangleLeft } from "react-icons/vsc";


import './TrackSection.css';


export default class TrackSection extends Component {
    constructor(props){
        super(props);

        this.state = {
            selection: 0,
            phase: 0,
            numPhases: 5,
        };

        this.setSelection = this.setSelection.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.resetSlides = this.resetSlides.bind(this);
        this.input1 = React.createRef();
        this.input2 = React.createRef();
        this.input3 = React.createRef();
        this.carousel = React.createRef();
    }

    componentDidMount(){
        this.setSelection({target: {value: "Four Weeks"}});

        this.input1.current.className = "";
        this.input2.current.className = "transitionLeft";

    }

    nextSlide(){
        const carousel = this.carousel.current;
        const itemWidth = carousel.querySelector('.carouselItem').clientWidth;
        carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        if(this.state.phase < this.state.numPhases){
            this.setState({phase: this.state.phase + 1});
        }
    }

    prevSlide(){
        const carousel = this.carousel.current;
        const itemWidth = carousel.querySelector('.carouselItem').clientWidth;
        carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        if(this.state.phase > 0){
            this.setState({phase: this.state.phase - 1});
        }
    }

    resetSlides(){
        this.setState({phase: 0});
        this.carousel.current.scrollTo({left: 0, behavior: 'smooth'});
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
            
            this.setState({selection: newSelection});
            this.resetSlides();
        }
    }

    render(){
        console.log(Object.keys(this.props.data)[this.state.selection]);
        console.log(this.props.data[Object.keys(this.props.data)[this.state.selection]]);
        return (
            
            <div className="artistHeader">
                <div className="artistSubHeader">
                    <div className="selectorBox">
                        <input type="radio" id="radio4" name="timePeriod" value="Four Weeks" onClick={this.setSelection} defaultChecked/>
                        <label ref={this.input1} for="radio4">4 Weeks</label>
                        <input type="radio" id="radio5" name="timePeriod" value="Six Months" onClick={this.setSelection}/>
                        <label ref={this.input2}for="radio5">6 Months</label>
                        <input type="radio" id="radio6" name="timePeriod" value="All Time" onClick={this.setSelection}/>
                        <label  ref={this.input3} for="radio6">All Time</label>
                    </div>
                    <div className="artistIconsOuter tSection">
                        <div className="header tSection">
                            <div className="carouselRelative">
                                
                                
                                <div className="carousel" ref={this.carousel}>
                                    {
                                        [...Array(this.state.numPhases).keys()].map((i) => {
                                            return (
                                                <div className="carouselItem">
                                                    {
                                                        this.props.data[Object.keys(this.props.data)[this.state.selection]].items.filter((item, index) => {
                                                            if(index >= i*10 && index < (i+1)*10){
                                                                return true;
                                                            }
                                                            return false;
                                                        }).map((item, index) => {
                                                            return (
                                                                <div className="trackItem" key={index}>
                                                                    <img className="trackImage" src={item.album.images[0].url} alt="track"/>
                                                                    <div className="trackName">{((this.props.data[Object.keys(this.props.data)[this.state.selection]].items.map(i => i.name).indexOf(item.name)))+1}. {item.name}</div>
                                                                    <div className="trackArtist">{item.artists.map(i => i.name).join(', ')}</div>
                                                                </div>
                                                            );
                                                        })

                                                    }
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                                <div className="controls">
                                    <VscTriangleLeft className="leftControl" onClick={this.prevSlide}/>
                                </div>
                                <div className="controls2">
                                    <VscTriangleRight className="rightControl" onClick={this.nextSlide}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}