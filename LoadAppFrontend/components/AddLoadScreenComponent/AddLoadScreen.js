import React from 'react';
import { useState } from 'react'
import { Button, Box, Input, Text, Stack, Spacer } from 'native-base';
import { NavButton } from '../NavButtonComponent/NavButton';

export const AddLoadScreen = () => {
    const [testString, setTest] = useState("");
    console.log(testString)
    const [nameIn, setName] = useState("");
    const [carrierIn, setCarrier] = useState("");
    const [codeIn, setCode] = useState("");
    return (
        <Box w="100%" h = "100%" alignSelf="center" alignItems="center" bg="coolGray.800">
            <Stack space={4} w="75%" mx="auto" shadow="5">
                <Text color = "white">
                    Enter the customer's name here:
                </Text>
                <Input variant="filled" placeHolder="Name" onChangeText={(value) => setName(value)}/>
                <Text color="white">
                    Enter the carrier here:
                </Text>
                <Input variant="filled" placeHolder="Carrier" onChangeText={(value) => setCarrier(value)}/>
                <Text color="white">
                    Enter your user code here here:
                </Text>
                <Input variant="filled" placeHolder="Code" onChangeText={(value) => setCode(value)} />
            </Stack>
            <Button width="20%" alignItems = "center" justifyItems="left" title="Submit" 
            bg="tertiary.500" borderWidth={2} borderColor="tertiary.800" shadow={4}
            onPress={() => sendLoad(n=nameIn, c=carrierIn, i=false, s=codeIn)}>
                <Text color="white">
                    Submit
                </Text>
            </Button>

        </Box>
    )
}

async function sendLoad(n, c, i, s) {
    try {
    console.log("POST is running\n n = %s c = %s i = %s s = %s", n, c, i, s)
    await fetch("http://10.0.2.2:5272/loaditems", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customerName: n,
            carrier: c,
            isComplete: i,
            secret : s 
        })
    }).then(console.log("Finished fetch successfully"))
    } catch(error) {
        console.log(error)
    }
}
