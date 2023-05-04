import React, { useRef, useState } from 'react';
import { View,Text, StyleSheet, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SummaryPage from '../Pages/SummaryPage'

function Summary(props) {

    const [visible, setVisibility] = useState(false)
    const completedList = [];
    const priorityList = [];
    const completed = props.list.map(val => {
        return val.todo.filter(value => {
            return value.completed
        })
    })
    const priority = props.list.map(val => {
        return val.todo.filter(value => {
            return value.priority === 'Low' || value.priority === 'High'
        })
    })

    props.list.forEach((val, i) => {
        priorityList.push({category: val.category, todo: priority[i]})
    })

    props.list.forEach((val, i) => {
        completedList.push({...val, todo: completed[i]})
    })


    switch(props.title){
        case 'Completed': percentage = () => Completed(); break;
        case 'All': percentage = () => All(); break;
        case 'Priorities': percentage = () => Priorities(); break;
        default: percentage = () => {return 0};
    }
    

    const Completed = () => {
        const numComp = completedList.reduce((sum, val) => {
            return sum + val.todo.length
        }, 0);

        return numComp
    }

    const All = () => {
        const numTodos = props.list.reduce((sum, val) => {
            return sum + val.todo.length
        }, 0);

        return numTodos
    }

    const Priorities = () => {
        const numPriorities = priorityList.reduce((sum, val) => {
            return sum + val.todo.length
        }, 0);

        return numPriorities
    }

    const renderPage = () => {
        if (props.title === 'Completed' || props.title === 'All'){
            return (
                <SummaryPage 
                    list = {props.title === 'All' ? props.list : completedList} 
                    title = {props.title} color = {props.color}
                    icon = {props.iconName}
                    close = {() => setVisibility(false)}
                    />
            )
        } else{
            return(
                <View></View>
            )
        }
    }


    return (
        <>
            <Modal animationType='slide' visible = {visible} onRequestClose={visible}>
                {renderPage()}
            </Modal>
            <Pressable style = {styles.container} onPress={() => setVisibility(true)}>
                <View style = {{gap: 10}}>
                    <Icon name = {props.iconName} color = {props.color} size = {30}/>
                    <Text style = {{fontSize: 18, fontWeight: 500, color: 'grey'}}>{props.title}</Text>
                </View>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    <View >
                        <Text style = {styles.number}>{percentage()}</Text>
                    </View>
                </View>
            </Pressable>
        </>
    );
}


export default Summary;

const styles = StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    progress: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    number: {
        fontSize: 30,
        fontWeight: 600
    }
})