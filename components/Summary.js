import React, { useEffect, useRef } from 'react';
import { View,Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Circle} from 'react-native-svg'

function Summary(props) {

    switch(props.title){
        case 'Priority': percentage = () => All(); break;
        case 'Completed': percentage = () => Completed(); break;
        default: percentage = () => {return 0};
    }
    

    const All = () => {
        return 3
    }

    const Completed = () => {
        const isCompleted = []
        
        const todos = props.list.map(value => {
            return value.todo
        })

        todos.forEach(element => {
            element.forEach(value => {
                isCompleted.push(value.completed)
            }) 
        })
        
        const numCompleted = isCompleted.filter(value => value).length
        return isNaN(numCompleted) ? 0 : numCompleted
    }


    return (
        <View style = {styles.container}>
            <View style = {{gap: 10}}>
                <Icon name = {props.iconName} color = {props.color} size = {30}/>
                <Text style = {{fontSize: 18, fontWeight: 500, color: 'grey'}}>{props.title}</Text>
            </View>
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <View >
                    <Text style = {styles.number}>{percentage()}</Text>
                </View>
            </View>
        </View>
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