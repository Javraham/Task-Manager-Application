import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable,  Modal, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TodayPage from '../Pages/TodayPage';
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
    const completedTasks = []
    const animate = useRef(new Animated.Value(0)).current;
    const progress = useRef(null)
    const completed = props.list.map(val => val.todo.filter(value => value.completed))
    const length = props.list.reduce((sum, val) => sum + val.todo.length, 0)
    props.list.forEach((val, i) => completedTasks.push({...val, todo: completed[i]}))
    const numComp = completedTasks.reduce((sum, val) => sum + val.todo.length, 0);
    const todayList =  props.list.filter(val => val.todo.length > 0)

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
    const percent = length > 0 ? Math.floor(numComp/length*100) : 0

    useEffect(() => {
        Animated.timing(animate, {
            toValue: percent,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }, [percent]);

    useEffect(() => {
        animate.addListener(value => {
            const strokeDashoffset = circumference*(1-(value.value/100))
            if(progress?.current){
                progress.current.setNativeProps({strokeDashoffset})
            }
        }) 
    }, [percent]);

    const renderItems = () => {
        let count = 0;
        const items = [];
        for(let i = 0; i < todayList.length; i++){
            for(let j = 0; j < todayList[i].todo.length; j++){
                if (!todayList[i].todo[j].completed){
                    items.push(todayList[i].todo[j].name);
                    count++;
                }
                if(count === 3) break
            }
            if (count === 3) break
        }
        
        return items.map((value, index) => {
            return (
                <View key={index} style = {{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <Icon name = 'circle-o'/>
                    <Text numberOfLines = {1} style = {{width: '60%'}}>{value}</Text>
                </View>
            )
        })
    }

    return (
        <View>
            <Modal visible = {showList} onRequestClose={() => toggleShow()} animationType='slide'>
                <TodayPage fullList = {props.list} list = {todayList} icon = 'calendar-today' close = {() => toggleShow()} updateList = {(list, index, i) => props.updateList(list, index, i)} rejectDelete = {true}/>
            </Modal>
            <Pressable onPress={() => toggleShow() } style = {styles.container}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style = {{gap: 5}}>
                        <Text style = {{fontSize: 25, fontWeight: 600}}>Todays Tasks</Text>
                        <View style = {{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                            <Icon name = 'calendar'/>
                            <Text>{month} {date.getDate()}, {date.getFullYear()} </Text>
                        </View>
                        <View>
                            {renderItems()}
                        </View>
                    </View>
                    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <Svg height={size} width={size}>
                            <Circle cx={center} cy={center} r={radius} stroke="#F9F9F9" strokeWidth={strokeWidth} />
                            <Circle
                                ref={progress}
                                cx={center} cy={center} r={radius} stroke={'#B1D7B4'} 
                                strokeWidth={strokeWidth} strokeDasharray={circumference}
                                />
                        </Svg>
                        <View style = {{position: 'absolute'}}>
                            <Text style = {{fontSize: 20, fontWeight: 600}}>{percent}%</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style = {{textAlign: 'center', fontSize: 18, padding: 5}}>{numComp} of {length} Tasks Completed</Text>
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