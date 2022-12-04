import React from "react"
import Navbar from "../../components/NavBar/Navbar"
import { NotifCard } from "../../components/NotifCard/NotifCard"
import { useState /*useEffect*/ } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import mockNotifs from "../../Mock_Data/Notification.json"
import ContractABI from "../../ABIs/ContractABI.json"
import { useNotification } from "web3uikit"

// const PushAPI = require("@pushprotocol/restapi")

const UserPage = () => {
    const CONTRACT_ADDRESS = "0x47F5Ce3e72622cf03B15e6A50d325Cc6a71762c2"

    const { isWeb3Enabled, account } = useMoralis()
    const { runContractFunction } = useWeb3Contract()
    const { dispatch } = useNotification()

    const [notifications, setNotifs] = useState(mockNotifs)

    const removeNotification = (clickedIdentifier) => {
        const newNotifications = notifications.filter((element) => {
            console.log(element)
            return element.identifier !== clickedIdentifier
        })

        setNotifs(newNotifications)
    }

    const approveNotification = async (clickedIdentifier) => {
        const newNotifications = notifications.find((element) => {
            return element.identifier === clickedIdentifier
        })
        console.log(newNotifications)
        const zkpObj = { ...newNotifications, zkp: true }
        console.log(zkpObj)
        console.log(JSON.stringify(zkpObj))

        const Options = {
            abi: ContractABI,
            contractAddress: CONTRACT_ADDRESS,
            functionName: "responseBack",
            params: {
                _requestor: "0x47F5Ce3e72622cf03B15e6A50d325Cc6a71762c2",
                data: JSON.stringify(zkpObj),
            },
        }

        await runContractFunction({
            params: Options,
            onSuccess: (tx) => handleResponseBack(tx),
            onError: (error) => console.log(error),
        })

        const handleResponseBack = (tx) => {
            tx.wait(1)
            dispatch({
                type: "success",
                title: "Success",
                message: "Notification sent",
                position: "topR",
            })
        }
    }

    // const Alerts = () => {
    //     useEffect(() => {
    //         const fetchNotifs = async (
    //             chainId = "8001",
    //             public_key = "0x5E4EE2aA55C20cae19eb8592aC8216264F9813dE",
    //             environment = "staging"
    //         ) => {
    //             try {
    //                 const notifications = await PushAPI.user.getFeeds({
    //                     user: `eip155:${chainId}:${public_key}`, // user address in CAIP
    //                     env: `${environment}`,
    //                 })

    //                 console.log(notifications)
    //             } catch (error) {
    //                 console.log("There was some issue getting the Notifications. Error: ", error)
    //                 return
    //             }
    //         }

    //         fetchNotifs("8001", account, "staging")
    //         const interval = setInterval(() => fetchNotifs(), 2000)
    //         return () => {
    //             clearInterval(interval)
    //         }
    //     }, [])
    // }

    // Alerts()

    return (
        <>
            <Navbar />
            <h1 className=" text-center text-3xl my-10">Pending Requests</h1>
            <div className="notifStack">
                {isWeb3Enabled ? (
                    notifications.map((element, index) => {
                        return (
                            <NotifCard
                                valType={element.valType}
                                minVal={element.minVal}
                                maxVal={element.maxVal}
                                FirstOperation={element.FirstOperation}
                                SecondOperation={element.SecondOperation}
                                removeNotification={removeNotification}
                                approveNotification={approveNotification}
                                identifier={element.identifier}
                                key={index}
                            />
                        )
                    })
                ) : (
                    <h1>Connect wallet</h1>
                )}
            </div>
        </>
    )
}

export default UserPage
