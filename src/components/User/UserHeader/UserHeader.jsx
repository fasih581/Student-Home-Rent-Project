import React from 'react'
import Css from "./UserMainLayout.module.css"

import MainHeader from "../../common/Header/MainHeader/MainHeader"

const UserHeader = () => {
  return (
    <div className={Css.box}>
    <MainHeader />
    </div>
  )
}

export default UserHeader