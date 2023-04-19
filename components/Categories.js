import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import TodoScreen from '../Pages/ListPage';
import TodoModal from '../Pages/TodoModal';



function Categories(props) {
    const [showList, setShow] = useState(false)
    const completedTasks = props.list.todo.filter(todo => todo.completed == true)

    const toggleShow = () => {
        setShow(!showList)
    }
    console.log(showList)
    return (
        <View>
            <Modal visible = {showList} onRequestClose={() => toggleShow()} animationType='slide'>
                <TodoScreen list = {props.list} close = {() => toggleShow()} updateList = {props.updateList}/>
            </Modal>
            <TouchableOpacity style = {[styles.container, {backgroundColor: props.list.color}]} onPress={() => toggleShow()}>
                <Text style = {styles.cat}>{props.list.category}</Text>
                <View style = {{paddingHorizontal: 10, justifyContent: 'space-around', height: '80%'}}>
                    <Icon name = {'plus'} color = 'white'/>
                    <View style = {{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <View style = {{backgroundColor: 'white', height: 10, width: 10, borderRadius: 5}}/>
                        <Text style = {{color: 'white'}}>{props.list.todo.length-completedTasks.length} Remaining</Text>
                    </View>
                    <View style = {{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <View style = {{backgroundColor: 'white', height: 10, width: 10, borderRadius: 5}}/>
                        <Text numberOfLines={1} style = {{color: 'white'}}>{completedTasks.length} Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        width: 120,
        paddingVertical: 10,
        borderRadius: 15,
        marginHorizontal: 10,
        
    },

    cat: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 700
    }
})