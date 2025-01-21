import React from 'react'
import Videocapturing from '../Reports/Videocapturing'
import { Navigate } from 'react-router-dom'

const VideocapturingPage = () => {
    return (
        <div>
            {
                window.localStorage.getItem("loginStatus") === "user_validated" ? (<Videocapturing />) : (<Navigate to={"/"} />)
            }


        </div>
    )
}

export default VideocapturingPage
