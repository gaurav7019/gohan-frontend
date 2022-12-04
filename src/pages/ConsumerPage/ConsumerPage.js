import React from "react"
import Navbar from "../../components/NavBar/Navbar"
import { Form, Button, useNotification } from "web3uikit"
import { /*useMoralis*/ useWeb3Contract } from "react-moralis"
import ContractABI from "../../ABIs/ContractABI.json"

const ConsumerPage = () => {
    const { runContractFunction } = useWeb3Contract()
    const { dispatch } = useNotification()
    // const { chainId, account, isWeb3Enabled } = useMoralis()
    const CONTRACT_ADDRESS = "0x47F5Ce3e72622cf03B15e6A50d325Cc6a71762c2"

    async function retrieveInfo(data) {
        console.log(data)

        const userAddress = data.data[0].inputResult
        const valueType = data.data[1].inputResult[0]
        const firstOperation = data.data[2].inputResult
        const secondOperation = data.data[3].inputResult
        const minValue = data.data[4].inputResult
        const maxValue = data.data[5].inputResult

        const Options = {
            abi: ContractABI,
            contractAddress: CONTRACT_ADDRESS,
            functionName: "requestUser",
            params: {
                _param: valueType,
                _ops: [firstOperation, secondOperation],
                _compParams: [minValue, maxValue],
            },
        }

        const handleRequestUser = async (tx) => {
            await tx.wait(1)
            dispatch({
                type: "success",
                title: "Success",
                message: "Notification sent",
                position: "topR",
            })
        }

        await runContractFunction({
            params: Options,
            onSuccess: (tx) => handleRequestUser(tx),
            onError: (error) => console.log(error),
        })
    }

    return (
        <>
            <Navbar />
            <div className="border-2 border-gray-400 max-w-md my-10 mx-auto rounded-md shadow-md">
                <div>
                    <Form
                        className=""
                        buttonConfig={{
                            onClick: function noRefCheck() {},
                            theme: "primary",
                        }}
                        customFooter={
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    size="regular"
                                    text="Confirm"
                                    theme="primary"
                                    type="submit"
                                />
                            </div>
                        }
                        data={[
                            {
                                inputWidth: "100%",
                                name: "Enter user address",
                                type: "text",
                                value: "",
                            },
                            {
                                name: "datatype",
                                options: ["heartbeat", "Calories Burnt", "Step Count"],
                                type: "radios",
                                value: "Select the Data Type",
                            },
                            {
                                name: "First Operation",
                                selectOptions: [
                                    {
                                        id: "max",
                                        label: "Max",
                                    },
                                    {
                                        id: "min",
                                        label: "Min",
                                    },
                                    {
                                        id: "avg",
                                        label: "Avg",
                                    },
                                    {
                                        id: "mavg",
                                        label: "MAvg",
                                    },
                                ],
                                type: "select",
                                value: "",
                            },
                            {
                                name: "Second Operation",
                                selectOptions: [
                                    {
                                        id: "max",
                                        label: "Max",
                                    },
                                    {
                                        id: "min",
                                        label: "Min",
                                    },
                                    {
                                        id: "avg",
                                        label: "Avg",
                                    },
                                    {
                                        id: "mavg",
                                        label: "MAvg",
                                    },
                                ],
                                type: "select",
                                value: "",
                            },
                            {
                                name: "Min Value",
                                type: "number",
                                validation: {
                                    numberMin: 1,
                                    required: true,
                                },
                                value: "",
                            },
                            {
                                name: "Max Value",
                                type: "number",
                                validation: {
                                    numberMin: 1,
                                    required: true,
                                },
                                value: "",
                            },
                        ]}
                        onSubmit={retrieveInfo}
                        title="Request Data"
                    />
                </div>
            </div>
        </>
    )
}

export default ConsumerPage
