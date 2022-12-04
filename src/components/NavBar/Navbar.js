import React from "react"
import { NavLink } from "react-router-dom"
import { ConnectButton } from "@web3uikit/web3"

const Navbar = () => {
    return (
        <>
            <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
                <NavLink to="/">
                    <img className=" max-h-12 rounded-md" src="logo.png" alt="MeData" />
                </NavLink>
                <div className="flex flex-row items-center">
                    <NavLink className="mr-6 p-6 font-bold" to="/">
                        Home
                    </NavLink>

                    <NavLink className="mr-6 p-6 font-bold" to="/user">
                        User
                    </NavLink>
                    <NavLink className="mr-6 p-6 font-bold" to="/consumer">
                        Consumer
                    </NavLink>
                    <ConnectButton moralisAuth={false} />
                </div>
            </nav>
        </>
    )
}

export default Navbar
