import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable,  Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TodoScreen from '../Pages/ListPage';
import Svg, {Circle} from 'react-native-svg'


function TodayTasks(props) {
    let month;
    const size = 100;
    const strokeWidth = 6;
    const center = size/2;
    const radius = size/2 - strokeWidth/2;
    const circumference = 2*Math.PI*radius
    const date = new Date();
    const [showList, setShow] = useState(false)
    const completedTasks = props.list.todo.filter(todo => todo.completed == true)

    const toggleShow = () => {
        setShow(!showList)
    }

    switch(date.getMonth()){
        case 0: month = 'Jan'; break;
        case 1: month = 'Feb'; break;
        case 2: month = 'Mar'; break;
        case 3: month = 'Apr'; break;
        case 4: month = 'May'; break;
        case 5: month = 'June'; break;
        case 6: month = 'July'; break;
        case 7: month = 'Aug'; break;
        case 8: month = 'Sep'; break;
        case 9: month = 'Oct'; break;
        case 10: month = 'Nov'; break;
        case 11: month = 'Dec'; break;
        default: month = 'Jan';
    }
    const percent = props.list.todo.length != 0 ? Math.floor(completedTasks.length/props.list.todo.length*100) : 0

    return (
        <View>
            <Modal visible = {showList} onRequestClose={() => toggleShow()} animationType='slide'>
                <TodoScreen list = {props.list} close = {() => toggleShow()} updateList = {props.updateList}/>
            </Modal>
            <Pressable onPress={() => toggleShow() } style = {styles.container}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style = {{fontSize: 25, fontWeight: 600}}>Todays Tasks</Text>
                        <View style = {{flexDirection: 'row', padding: 5, alignItems: 'center', gap: 3}}>
                            <Icon name = 'calendar'/>
                            <Text>{month} {date.getDate()}, {date.getFullYear()} </Text>
                        </View>
                    </View>
                    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <Svg height={size} width={size}>
                            <Circle cx={center} cy={center} r={radius} stroke="#F9F9F9" strokeWidth={strokeWidth} />
                            <Circle 
                                cx={center} cy={center} r={radius} stroke={'#B1D7B4'} 
                                strokeWidth={strokeWidth} strokeDasharray={circumference}
                                strokeDashoffset={circumference*(1-(percent/100))}
                                />
                        </Svg>
                        <View style = {{position: 'absolute'}}>
                            <Text style = {{fontSize: 20, fontWeight: 600}}>{percent}%</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style = {{textAlign: 'center', fontSize: 18}}>{completedTasks.length} of {props.list.todo.length} Tasks Completed</Text>
                </View>
            </Pressable>
        </View> 
    )
}

export default TodayTasks;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10
    }
})