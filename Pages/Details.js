import React, { useState } from 'react';
import {View, StyleSheet, SafeAreaView, Button, Text, Pressable, TouchableOpacity, DatePickerIOSComponent} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

function DetailPage(props) {
    const [priority, setPriority] = useState(false)
    const [level, setLevel] = useState(props.item.priority)
    const [date, setDate] = useState(props.item.Date === null ? new Date() : props.item?.Date?.toDate())
    const [showDate, setShowDate] = useState(props.item.Date === null ? false : true)
    const [pressable, setPressable] = useState(false)

    const handleLevel = (level) => {
        setLevel(level)
        setPriority(false)
    }

    const updateFields = () => {
        list.todo[props.index].priority = level;
        list.todo[props.index].Date = date
        props.update(list);
        props.close()
    }

    const renderLevels = (levels) => {
        return levels.map((pLevel, i) => {
            return(
                <TouchableOpacity key = {i} onPress={() => handleLevel(pLevel)} style = {{backgroundColor: level === pLevel ? '#EBF5FB' : 'white', borderRadius: 10, paddingHorizontal: 5}}>
                    <Text style = {{fontSize: 17, color: level === pLevel ? '#5DADE2' : 'grey',  fontWeight: level === pLevel ? 'bold' : 400}}>{pLevel}</Text>
                </TouchableOpacity>
            )
        })
    }

    const handleShow = () => {
        showDate ? setDate(null) : setDate(new Date())
        setShowDate(!showDate)
    }

    const changeDate = (event, selectedDate) => {
        event.type === 'dismissed' ? setPressable(false) : setPressable(true)
        console.log(selectedDate)
        setDate(selectedDate || date)
    }

    const renderDate = () => {
        console.log(date, new Date())
        if(showDate){
            return (
                <Text style = {{fontSize: 10, color: 'grey'}}>{date === new Date() ? 'Today' : 'Tomorrow'}</Text>
            )
        }
    }


    return (
        <SafeAreaView style = {styles.infoContainer}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                <Button title='Close' onPress={() => props.close()}/>
                <Text style = {{fontSize: 17, fontWeight: 500}}>Details</Text>
                <Button title='Done' onPress={() => updateFields()}/>
            </View>
            <View style = {[styles.priority, {paddingVertical: 9, marginBottom: 10}]}>
                <View>
                    <Text style = {{fontSize: 16, fontWeight: 400}}>Date</Text>
                    {renderDate()}
                </View>
                <View style = {{flexDirection: 'row', gap: 5}}>
                    <Pressable disabled = {pressable} onPress={() => handleShow()} style = {[styles.showDate, {backgroundColor: showDate ? '#D5F5E3' : 'white',}]}>
                        <Icon name='calendar-plus-o' size={25} color={'#2ECC71'} />
                    </Pressable>
                    {showDate && <DateTimePicker value = {date ?? new Date()} minimumDate={new Date()} onChange={changeDate}/>}
                </View>
            </View>
            
            <Pressable disabled = {pressable} style = {styles.priority} onPress={() => setPriority(true)}>
                <Text style = {{fontSize: 16, fontWeight: 400}}>Priority</Text>
                    {priority && 
                    <View style = {{flexDirection: 'row', gap: 10}}>
                        {renderLevels(['None', 'Low', 'High'])}
                    </View> ||
                    !priority && 
                    <View style = {{flexDirection: 'row', gap: 5}}>
                        <Text style = {{fontSize: 16, fontWeight: 400, color: 'grey'}}>{level}</Text>
                        {level !== 'None' && 
                            <Icon 
                                name={level === 'Low' ? 'star-o' : 'exclamation-circle'} 
                                color={level === 'Low' ? 'gold' : '#0E86D4'}
                                size={20}
                            />
                        }                            
                    </View>  
                    }
            </Pressable>
        </SafeAreaView>
    )
}

export default DetailPage;

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: '#F2F2F7',
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'absolute',
        bottom: 0,
        height: '40%',
    },

    priority: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 10
    },

    showDate: {
        height: 35,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
})