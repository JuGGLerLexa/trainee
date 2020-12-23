import React, {Component} from 'react';
import './Header.css'
import logo from "../../logo.svg";
import HeaderItem from "../header-item/HeaderItem";

class Header extends Component {
  headerArr = ['Home', 'Announcements']
  render() {
    return (
        <div className='header-wrapper'>
          <img src={logo} className="logo" alt="logo" />
          {this.headerArr.map(value => <HeaderItem item={value} key={value}/>)}
        </div>
    );
  }
}

export default Header;