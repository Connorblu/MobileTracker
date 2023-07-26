import React from 'react';
import { useState } from 'react'
import { Box, Text, VStack, Select, Center, Input, Hidden, ArrowForwardIcon, Row, Spacer, ScrollView } from 'native-base';
import { NavButton } from '../NavButtonComponent/NavButton';

function Load(id, customer, carrier, iscomplete, source, dest) {
    this.id = id;
    this.customer = customer;
    this.carrier = carrier;
    this.iscomplete = iscomplete;
    this.source = source;
    this.dest = dest;
}

const InField = (show) => {
    if (show === true) {
        return (
            <Box/>
        )
    }
    else {
        return <Hidden/>
    }
}

export const ViewLoadScreen = () => {
    const [opt, setOpt] = useState("all");
    const [queryVal, setQueryVal] = useState("");
    const [loadList, setLoadList] = useState([]);
    const [showInput, setShowInput] = useState(false);
    getLoads(opt, queryVal).then((response) => response.json()).then((json) => {
        list = []
        for (const item of json) {
            list.push(new Load(
                id = item.id,
                customer = item.customerName,
                carrier = item.carrier,
                iscomplete = item.isComplete,
                source = item.source,
                dest = item.dest
            ))
        }
        setLoadList(list)
    }).catch(function(error) {
        console.log(error);
    });
    return (
        <Box alignSelf="center" alignItems="center" bg="coolGray.800" w="100%" h="100%">
            <Select placeholder = "View" minWidth="200"
            onValueChange={(selectedValue) => {
                setOpt(selectedValue);
                setShowInput(!(selectedValue === "all"))
                return;
            }}>
                <Select.Item label="View All" value="all"/>
                <Select.Item label="View By ID" value="id"/>
                <Select.Item label="View By Carrier" value="carrier"/>
                <Select.Item label="View By Source" value="source"/>
                <Select.Item label="View By Destination" value="dest"/>
            </Select>

            {showInput && <Input h="8" w="100%" placeholder="Lookup" onChangeText={(value) => setQueryVal(value)}/>} 

            <ScrollView h="100%" w="90%" safeArea>
            <VStack space={4} alignItems="center">
            {
                    loadList.map((load) => {
                        return (
                            <Box width = {225} height={130} bg = "white" borderColor = "blueGray.400" 
                            p = "1" border Radius = "md" borderWidth="5" rounded={6}>
                                <Box bg="black" rounded={6}>
                                    <Text color="white" h={7} p={0.5}>
                                        ID: {load.id + "\n"} 
                                    </Text>
                                </Box>
                                <Text>
                                    Customer: {load.customer + "\n"}Carrier: {load.carrier + "\n"}
                                </Text>
                                <Row alignItems="center" key={load.id} bg="tertiary.500">
                                    <Text>
                                        {load.source}
                                    </Text>
                                    <Spacer/>
                                    <ArrowForwardIcon w="33%" alignSelf="center"/>
                                    <Spacer/>
                                    <Text>
                                        {load.dest}
                                    </Text>
                                </Row>
                            </Box>
                        )
                        }
                        )
            }
            </VStack>
            </ScrollView>
            <NavButton 
                buttonName="back"
                destName="Home"
            />
        </Box>
    )
}

async function getLoads(option, val) {
    if (option === null || option === undefined) {
        return [];
    }
    try {
        if (option === "all") {
            return await fetch("http://10.0.2.2:5272/loaditems/")
        }
        else if (option === "carrier"){
            return await fetch("http://10.0.2.2:5272/loaditems/carrier/" + val)
        } 
        else if (option === "source"){
            return await fetch("http://10.0.2.2:5272/loaditems/source/" + val)
        }
        else if (option === "dest"){
            return await fetch("http://10.0.2.2:5272/loaditems/dest/" + val)
        } 
        else {
            return await fetch("https://10.0.2.2:5272/loaditems/" + val)
        }
    } catch(error) {
        console.error(error)
        console.log("Value of selection at failure:" + option)
        return [];
    }
}