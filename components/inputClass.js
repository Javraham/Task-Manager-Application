import React from 'react';
import {useState} from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function TodoInputClass({deleteInput = () => {}, auto, ...props}) {
    const [focus, setFocus] = useState(false)
    
    return (
        <View style = {styles.input}>
             <TextInput  maxLength = {30} onFocus = {() => setFocus(true)} {...props} autoFocus = {auto}
              onBlur = {() => {
                setFocus(false) 
                deleteInput()}}
                style = {{ fontSize: 16, flexGrow: 1, paddingBottom: 5,
                borderColor: focus ? 'lightblue' : 'grey', alignItems: 'center', borderBottomWidth: focus ? 2 : 1, alignItems: 'center'}} />
        </View>
    );
}

export default TodoInputClass;

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 30,
        flexGrow: 1,
    },
})