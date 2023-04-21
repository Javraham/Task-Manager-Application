import React, { useEffect, useRef } from 'react';
import { View,Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Circle} from 'react-native-svg'

function Summary(props) {
    const size = 60;
    const strokeWidth = 4;
    const center = size/2;
    const radius = size/2 - strokeWidth/2;
    const circumference = 2*Math.PI*radius


    switch(props.title){
        case 'Today': percentage = () => todayCompleted(); break;
        case 'Priority': percentage = () => priorityCompleted(); break;
        case 'Completed': percentage = () => Completed(); break;
        case 'Scheduled': percentage = () => Scheduled(); break;
        default: percentage = () => {return 0};
    }


    const todayCompleted = () => {
        const list = props.list.find(value => {
            return value.category === 'Todays List'
        })
        const numCompleted = list.todo.reduce((total, value) => {
            if(value.completed){
                return total + 1
            } else{
                return total
            }
        }, 0)

        percent = list.todo.length != 0 ? Math.floor(numCompleted/list.todo.length*100) : 0
        return percent ?? 0
    }

    const priorityCompleted = () => {
        return 60
    }

    const Completed = () => {
        const hasCompleted = []
        const todos = props.list.map(value => {
            return value.todo
        })
        todos.forEach(element => {
            element.map(value => {
                hasCompleted.push(value.completed)
            })
        });
        const completed = hasCompleted.filter(value => value)
        percent = Math.floor(completed.length/hasCompleted.length*100)
        return percent ?? 0
    }

    const Scheduled = () => {
        return 50
    }

    return (
        <View style = {styles.container}>
            <View style = {{gap: 10}}>
                <Icon name = {props.iconName} color = {props.color} size = {20}/>
                <Text>{props.title}</Text>
            </View>
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <Svg height={size} width={size}>
                    <Circle cx={center} cy={center} r={radius} stroke="#F9F9F9" strokeWidth={strokeWidth} />
                    <Circle 
                        cx={center} cy={center} r={radius} stroke={props.color} 
                        strokeWidth={strokeWidth} strokeDasharray={circumference}
                        strokeDashoffset={circumference*(1-percentage()/100)}
                        />
                </Svg>
                <View style = {{position: 'absolute'}}>
                    <Text>{percentage()}%</Text>
                </View>
            </View>
        </View>
    );
}


export default Summary;

const styles = StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: '#e5e5e5',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    progress: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})