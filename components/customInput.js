import React from 'react';
import {useState} from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function TodoInput({checkClicked, ...props}) {
    const [focus, setFocus] = useState(false)
    const [clicked, setClick] = useState(false)
    
    return (
        <View style = {styles.input}>
            <TouchableOpacity 
                style = {[styles.button, {borderWidth: clicked ? null : 1}]} onPress={() => setClick(!clicked)}>
                {clicked && <Icon name = 'check-circle' size = {26} color = 'green' />}
            </TouchableOpacity>
             <TextInput  maxLength = {30} onFocus = {() => setFocus(true)} {...props} autoFocus = {true}
             onBlur = {() => setFocus(false)} style = {{borderBottomWidth: 1, fontSize: 16, flexGrow: 1, borderColor: focus ? 'green' : 'grey', alignItems: 'center'}} />
        </View>
    );
}

export default TodoInput;

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 30,
        flexGrow: 1
    },

    button: {
        width: 25, 
        height: 25, 
        borderRadius: 12.5, 
        marginBottom: 5,
        borderColor: 'grey'
    }
})