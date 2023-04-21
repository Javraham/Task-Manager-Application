import React, { useState } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tempData from '../tempData';


function AddCategory(props){
    const BGcolor = ['#FAAB78', '#7FE9DE', '#E97777', '#7FB77E', '#B2A4FF', '#40DFEF', '#C3FF99', '#FF87B2']
    const [text, setText] = useState('');
    const [color, setColor] = useState(BGcolor[0])
    const [error, setError] = useState(false)

    const renderColor = () => {
        return BGcolor.map((color) => {
            return(
                <TouchableOpacity key = {color} 
                style = {{height: 30, width: 30, borderRadius: 10, backgroundColor: color}}
                onPress={() => setColor(color)}
                />
            )
        })

    }

    const createCategory = (text) => {
        if (text.length === 0){
            setError(true)
        }
        else{
            props.add({category: text, color: color, todo: []})
            setText('')
            props.close();
        }
    }

    return (
        <KeyboardAvoidingView style = {styles.container} behavior='padding'>
            <View style = {{position: 'absolute', top: 60, right: 30}}>
                <TouchableOpacity onPress = {props.close} >
                    <Icon name = 'times' size = {30}/>
                </TouchableOpacity>
            </View>
            <View style = {{gap: 20, width: '80%'}}>
                <Text style = {styles.header}>Add Project</Text>
                <View>
                    <TextInput maxLength = {12} placeholder='add todo...' style = {styles.input} onChangeText={text => setText(text)}/>
                    {error && <View style = {{flexDirection: 'row', gap: 5, paddingTop: 5, alignItems: 'center'}}>
                                <Icon name = 'exclamation-triangle' color = {'red'}/>
                                <Text style = {{color: 'red'}}>Please enter a project name</Text>
                            </View>}
                </View>
                <View style = {styles.color}>
                    {renderColor()}
                </View>
                <TouchableOpacity style = {[styles.button, {backgroundColor: color}]} onPress = {() => createCategory(text)}>
                    <Text style = {{textAlign: 'center', fontWeight: 'bold'}}>Create</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
    
}

export default AddCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        borderRadius: 10
    },

    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },

    color: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})