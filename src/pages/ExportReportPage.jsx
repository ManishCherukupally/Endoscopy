import React from 'react'
import ExportReport from '../Reports/ExportReport'
import { Navigate, NavigationType } from 'react-router-dom'

const ExportReportPage = () => {
    return (
        <div>
            {
                window.localStorage.getItem("loginStatus") === "user_validated" ? (<ExportReport />) : (<Navigate to={"/"} />)
            }

        </div>
    )
}

export default ExportReportPage
