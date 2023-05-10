import React, { useState } from 'react';
import {View, StyleSheet, SafeAreaView, Button, Text, Pressable, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

function DetailPage(props) {
    const [priority, setPriority] = useState(false)
    const [level, setLevel] = useState(props.item.priority)
    const [date, setDate] = useState(props.item.Date === null ? null : !(props.item.Date instanceof Date) ? props.item.Date.toDate() : props.item.Date)
    const [showDate, setShowDate] = useState(props.item.Date === null ? false : true)
    const [pressable, setPressable] = useState(false)

    const handleLevel = (level) => {
        setLevel(level)
        setPriority(false)
    }

    const updateFields = () => {
        console.log(date)
        list.todo[props.index].priority = level;
        list.todo[props.index].Date = date
        props.update(list);
        props.close()
    }

    const renderLevels = (levels) => {
        return levels.map((pLevel, i) => {
            return(
                <TouchableOpacity key = {i} onPress={() => handleLevel(pLevel)} style = {{backgroundColor: level === pLevel ? '#EBF5FB' : 'white', borderRadius: 10, paddingHorizontal: 5}}>
                    <Text style = {{fontSize: 15, color: level === pLevel ? '#5DADE2' : 'grey',  fontWeight: level === pLevel ? 'bold' : 400}}>{pLevel}</Text>
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
        setDate(selectedDate || date)
    }

    const renderDate = () => {
        const isToday = date.getDate() === new Date().getDate() && 
                        date.getMonth() === new Date().getMonth() && 
                        date.getFullYear() === new Date().getFullYear()
        let month; 

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

        if(showDate){
            return (
                <Text style = {{fontSize: 10, color: 'blue'}}>{isToday ? 'Today' : month + ' ' + date.getDate() + ', ' + date.getFullYear()}</Text>
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
            <View style = {[styles.field, {justifyContent: 'flex-start'}]}>
                <Text style = {{fontSize: 16, fontWeight: 400}}>Name: </Text>
                <Text style = {{fontSize: 16, fontWeight: 400, color: 'grey'}} numberOfLines={1}>{props.item.name}</Text>
            </View>
            <View style = {styles.field}>
                <View>
                    <Text style = {{fontSize: 16, fontWeight: 400}}>Date</Text>
                    {showDate ? renderDate() : null}
                </View>
                <View style = {{flexDirection: 'row', gap: 5}}>
                    <Pressable disabled = {pressable} onPress={() => handleShow()} style = {[styles.showDate, {backgroundColor: showDate ? '#D5F5E3' : 'white',}]}>
                        <Icon name='calendar-plus-o' size={25} color={'#2ECC71'} />
                    </Pressable>
                    {showDate && <DateTimePicker value = {date ?? new Date()} minimumDate={new Date()} onChange={changeDate}/>}
                </View>
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Pressable disabled = {pressable} style = {[styles.field, {flexGrow: 1}]} onPress={() => setPriority(true)}>
                    <Text style = {{fontSize: 16, fontWeight: 400}}>Priority</Text>
                        {priority && 
                        <View style = {{flexDirection: 'row'}}>
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
            </View>
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
        justifyContent: 'space-between'
    },

    field: {
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