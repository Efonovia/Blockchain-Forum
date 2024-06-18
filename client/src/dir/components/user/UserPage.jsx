import React from 'react'
import {AllUsers} from './AllUsers'
import { Bio } from './Bio'
import Following from './Following'
import Follows from './Follows'
import Info from './Info'
import Modal from './Modal'
import { Myfollowers } from './Myfollowers'
import { Myfollowing } from './Myfollowing'
import Settings from './Settings'
import SocialsSettings from './SocialsSettings'

const UserPage = () => {
  return (
    <div>
        {/* <AllUsers /> */}
        <Following />
        <Bio />
        <Follows />
        <Info />
        <Myfollowers />
        <Myfollowing />
        <SocialsSettings />

        {/* <Settings /> */}
        <Modal />


    </div>
  )
}

export default UserPage