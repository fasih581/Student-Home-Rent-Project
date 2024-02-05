import React from 'react'
import Css from "./UserHeader.module.css"

import MainHeader from "../../common/Header/MainHeader/MainHeader"

const UserHeader = () => {
  return (
    <div className={Css.userhead}>
    <div className={Css.box}>
    <MainHeader />
    <div className={Css.userBody}>
        <h1>HOME AWAY FROM HOME</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
    </div>
    </div>
    </div>
  )
}

export default UserHeader