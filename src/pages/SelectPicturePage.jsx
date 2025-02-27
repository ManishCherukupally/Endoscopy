import React from 'react'
import SelectPictureReport from '../Reports/SelectPictureReport'
import { Navigate } from 'react-router-dom'

const SelectPicturePage = () => {
    return (
        <div>
            {
                window.localStorage.getItem("loginStatus") === "user_validated" ? (<SelectPictureReport />) : (<Navigate to={"/"} />)
            }
            {/* <SelectPictureReport /> */}

        </div>
    )
}

export default SelectPicturePage
