import React from 'react';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export const NavButton = ({buttonName, destName}) => {
    const nav = useNavigation();
    return (
        <Button 
            alignItems = "center"
            title = {buttonName}
            onPress={() => nav.navigate(destName)}
            bg="tertiary.500" borderWidth={2} borderColor="tertiary.800" shadow={4}
            p={3}
        >
            {buttonName}
        </Button>
    )
}