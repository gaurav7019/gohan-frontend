import "./App.css"
import { NotifCard } from "./components/NotifCard/NotifCard"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import ConsumerPage from "./pages/ConsumerPage/ConsumerPage"
import UserPage from "./pages/UserPage/UserPage"
import { MoralisProvider } from "react-moralis"
const PushAPI = require("@pushprotocol/restapi")

function App() {
    return (
        <MoralisProvider initializeOnMount={false}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/user" element={<UserPage />}></Route>
                    <Route path="/consumer" element={<ConsumerPage />}></Route>
                </Routes>
            </BrowserRouter>
        </MoralisProvider>
    )
}

export default App
