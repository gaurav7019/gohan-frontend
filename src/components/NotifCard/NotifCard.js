import React from "react"
import "./NotifCard.css"
// import { FcAbout, FcApproval, FcHighPriority } from "react-icons/fc"
import { Check, Cross, Info } from "@web3uikit/icons"
export const NotifCard = ({
    valType,
    minVal,
    maxVal,
    FirstOperation,
    SecondOperation,
    removeNotification,
    approveNotification,
    identifier,
}) => {
    return (
        <div className="notifCardContainer cursor-pointer">
            <Info fontSize="35px" className="icon text-blue-600" />
            <div className="notifContent">
                <p>{`Request for ${valType} between ${minVal} and ${maxVal} and evaluate ${SecondOperation} of ${FirstOperation}`}</p>
            </div>
            <div className="acceptIcons">
                <Check
                    fontSize="30px"
                    className="icon text-green-600"
                    onClick={() => approveNotification(identifier)}
                />
                <Cross
                    fontSize="20px"
                    className="icon text-red-600"
                    onClick={() => removeNotification(identifier)}
                />
            </div>
        </div>
    )
}
