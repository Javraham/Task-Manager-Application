import React, { useState } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Pressable, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


function AddCategory(props){
    const date = new Date();
    const timestamp = Date.now()
    const BGcolor = ['#E67E22', '#2980B9', '#1ABC9C', '#C0392B', '#2ECC71', '#A569BD', '#40DFEF', '#F4D03F', '#FF87B2', '#EC7063']
    const icons = ['format-list-bulleted', 'weather-sunny', 'moon-waning-crescent', 'globe-model', 'briefcase-outline', 'run', 'weight-lifter'
                    ,'gamepad-variant-outline', 'camera-outline', 'food-outline', 'music', 'cards-heart-outline', 'car-hatchback', 'brush',
                    'home-outline', 'filmstrip', 'wrench-outline', 'shopping-outline', 'school-outline', 'airplane', 'shower', 'airballoon-outline'
                    , 'alarm', 'alert-circle-outline', 'anchor', 'android', 'angular', 'apple', 'arm-flex-outline', 'atom', 'baby-face-outline'
                    , 'baby-carriage', 'badge-account-horizontal-outline', 'bank', 'bash', 'basketball', 'bicycle', 'dog-side', 'camera',
                    'cart-outline', 'cash', 'chart-line']
    const [text, setText] = useState('');
    const [color, setColor] = useState(BGcolor[0])
    const [icon, setIcon] = useState(icons[0])
    const [error, setError] = useState(false)
    const [disable, setDisable] = useState(true)
    const [iconArray, setIconArray] = useState(Array(icons.length).fill(false).map((val, i) => i === 0 ? true : false))
    const [colorArray, setColorArray] = useState(Array(BGcolor.length).fill(false).map((val, i) => 0 ? true : false))

    const renderColor = () => {
        return BGcolor.map((color, index) => {
            return(
                <TouchableOpacity key = {color} 
                style = {{height: 30, width: 30, borderRadius: 10, backgroundColor: color, justifyContent:'center', alignItems: 'center'}}
                onPress={() => setColors(color)}>
                    {colorArray[index] && <Icon name='circle' color={'white'}/>}
                </TouchableOpacity>
            )
        })

    }

    const renderIcons = () => {
        return icons.map((icon, index) => {
            return(
                <TouchableOpacity key = {icon} onPress={() => setIcons(icon)} style = {{padding: 10, borderRadius: 10, backgroundColor : iconArray[index] ? color+30 : 'white'}}>
                    <MaterialCommunityIcons name={icon} size = {25} color = {iconArray[index] ? color : 'grey'}/>
                </TouchableOpacity>
            )
        })

    }

    const setIcons = (icon) => {
        const newArray = Array(icons.length).fill(false)
        setIcon(icon)
        newArray[icons.indexOf(icon)] = true
        setIconArray(newArray)
    }

    const setColors = (color) => {
        const newArray = Array(BGcolor.length).fill(false)
        setColor(color)
        newArray[BGcolor.indexOf(color)] = true
        setColorArray(newArray)
    }

    const createCategory = (text) => {
        if (text.length === 0){
            setError(true)
        }
        else{
            props.add({category: text, color: color, icon: icon, todo: [], timestamp: timestamp})
            setText('')
            props.close();
        }
    }

    const handleText = (text) => {
        setText(text)
        setDisable(text.length === 0 ? true : false)
    }

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor: color + 20}]}>
            <View style = {styles.top}>
                <TouchableOpacity onPress = {props.close} >
                    <Icon name = 'times' size = {30}/>
                </TouchableOpacity>
                <MaterialCommunityIcons name = {icon} size = {50} color={color}/>
                <TouchableOpacity disabled = {disable} onPress = {() => createCategory(text)}>
                    <Text style = {{fontSize: 18, color: disable ? 'grey' : color, fontWeight: 600}}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style = {{gap: 20, alignItems: 'center'}}>
                <Text style = {styles.header}>Add Task List</Text>
                <View style = {{width: '90%'}}>
                    <TextInput maxLength = {30} placeholder='Title' style = {styles.input} onChangeText={text => handleText(text)}/>
                    {error && <View style = {{flexDirection: 'row', gap: 5, paddingTop: 5, alignItems: 'center'}}>
                                <Icon name = 'exclamation-triangle' color = {'red'}/>
                                <Text style = {{color: 'red'}}>Please enter a project name</Text>
                            </View>}
                </View>
                <View style = {styles.color}>
                    {renderColor()}
                </View>
                <View style = {styles.icon}>
                    {renderIcons()}
                </View>
            </View>
            <View/>
        </SafeAreaView>
    );
    
}

export default AddCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    header: {
        fontSize: 30,
        fontWeight: 500
    },

    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        borderRadius: 10
    },

    input: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        fontSize: 20,
    },

    color: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },

    icon: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        justifyContent: 'center'
    }
})