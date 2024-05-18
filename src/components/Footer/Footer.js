import React, { Component } from 'react';
import { FaLinkedin, FaInstagram} from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";


import './Footer.css';

export default class Footer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="footer">
                <div className="footerText">Created by Satvik Vejendla</div>
                <div className="links">
                    <a href="https://www.linkedin.com/in/satvikvejendla/" target="_blank"><FaLinkedin className="linkIcon"/></a>
                    <a href="https://www.instagram.com/satvikvejendla/" target="_blank"><FaInstagram className="linkIcon"/></a>
                    <a href="https://www.github.com/SatvikVejendla" target="_blank"><FaGithub className="linkIcon"/></a>
                    <a href="mailto:satvej1@gmail.com" target="_blank"><IoMdMail className="linkIcon"/></a>

                </div>
            </div>
        );
    }
}