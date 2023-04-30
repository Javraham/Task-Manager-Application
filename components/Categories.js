import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, TouchableHighlight, Pressable, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import TodoScreen from '../Pages/ListPage';
import TodoModal from '../Pages/TodoModal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgressBar from './ProgressBar';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



function Categories({navigation, list, updateList, deleteList}) {
    const [showList, setShow] = useState(false)
    const completedTasks = list.todo.filter(todo => todo.completed == true)

    const toggleShow = () => {
        setShow(!showList)
    }

    const renderItem = () => {
        const item = list.todo.filter((value, index) => index < 2)
        if(item.length === 0){
            return <Text style = {{color: 'white'}}>Tap to add tasks</Text>
        }
        return item.map((value, index) => {
            return (
                <View key={index} style = {{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <Icon name = {value.completed ? 'check-circle' : 'circle-o'} color={'white'}/>
                    <Text numberOfLines = {1} style = {{width: '90%', color: 'white'}}>{value.name}</Text>
                </View>
            )
        })
    }

    const percent = list.todo.length != 0 ? Math.floor(completedTasks.length/list.todo.length*100) : 0

    return (
        <View>
            <Modal visible = {showList} onRequestClose={() => toggleShow()} animationType='slide'>
                <TodoScreen list = {list} close = {() => toggleShow()} updateList = {updateList} deleteList = {deleteList}/>
            </Modal>
                <Pressable style = {styles.container} onPress={() => toggleShow()} >
                    <View style = {[styles.TopCon, {backgroundColor: list.color}]}>
                            <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <MaterialCommunityIcons name = {list.icon} size ={30} color = {'white'}/>
                                <Text>{list.timerstamp}</Text>   
                                <Icon name = {'info-circle'} size ={20} color = {'white'}/>   
                            </View>
                            <Text style = {styles.cat} numberOfLines={1}>{list.category}</Text>
                            <View><Text style = {{color: 'white'}}>{list.todo.length} {list.todo.length === 1? 'Task' : 'Tasks'}</Text></View>                      
                    </View>
                    <View style = {styles.progressCon}>
                        <Text style = {{textAlign: 'right', fontSize: 20, fontWeight: 600}}>{percent}%</Text>
                        <ProgressBar color = {list.color} percent={percent}/>
                    </View>
                </Pressable>
        </View>
    );
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        width: 150,
        marginHorizontal: 10,
        height: '90%',
    },

    cat: {
        color: 'white',
        fontWeight: 700,
        fontSize: 20
    },

    add: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 5
    },

    progressCon: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius:15,
        gap: 10
    },

    TopCon: {
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 2,
        justifyContent: 'space-between'
    }
})