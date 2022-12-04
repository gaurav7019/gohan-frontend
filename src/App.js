import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import ConsumerPage from "./pages/ConsumerPage/ConsumerPage"
import UserPage from "./pages/UserPage/UserPage"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

function App() {
    return (
        <MoralisProvider initializeOnMount={false}>
            <BrowserRouter>
                <NotificationProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/user" element={<UserPage />}></Route>
                        <Route path="/consumer" element={<ConsumerPage />}></Route>
                    </Routes>
                </NotificationProvider>
            </BrowserRouter>
        </MoralisProvider>
    )
}

export default App
