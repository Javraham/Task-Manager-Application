import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, TouchableHighlight, Pressable, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import TodoScreen from '../Pages/ListPage';
import TodoModal from '../Pages/TodoModal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgressBar from './ProgressBar';



function Categories({navigation, list, updateList}) {
    const [showList, setShow] = useState(false)
    const completedTasks = list.todo.filter(todo => todo.completed == true)

    const toggleShow = () => {
        setShow(!showList)
    }

    const percent = list.todo.length != 0 ? Math.floor(completedTasks.length/list.todo.length*100) : 0
    

    return (
        <View>
            <Modal visible = {showList} onRequestClose={() => toggleShow()} animationType='slide'>
                <TodoScreen list = {list} close = {() => toggleShow()} updateList = {updateList}/>
            </Modal>
                <View style = {styles.container}>
                    <View style = {[styles.TopCon, {backgroundColor: list.color}]}>
                        <Pressable  style = {styles.add} onPress={() => toggleShow()}>
                            <Icon name = 'plus' size ={15} color = 'white'/>
                        </Pressable>
                        <Text style = {styles.cat} numberOfLines={2}>{list.category}</Text>
                        <Text style = {{color: 'white'}}>{list.todo.length} Tasks</Text>
                    </View>
                    <View style = {styles.progressCon}>
                        <Text style = {{textAlign: 'right', fontSize: 20, fontWeight: 600}}>{percent}%</Text>
                        <ProgressBar color = {list.color} percent={percent+'%'}/>
                    </View>
                </View>
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
        width: 27,
        height: 27,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
        justifyContent: 'space-around'
    }
})