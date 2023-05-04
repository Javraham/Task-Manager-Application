import React, { useState } from 'react';
import {View, StyleSheet, SafeAreaView, Button, Text, Pressable, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

function DetailPage(props) {
    const [priority, setPriority] = useState(false)
    const [level, setLevel] = useState(props.item.priority)

    const handleLevel = (level) => {
        setLevel(level)
        setPriority(false)
    }

    const updateFields = () => {
        list.todo[props.index].priority = level;
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


    return (
        <SafeAreaView style = {styles.infoContainer}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                <Button title='Close' onPress={() => props.close()}/>
                <Text style = {{fontSize: 17, fontWeight: 500}}>Details</Text>
                <Button title='Done' onPress={() => updateFields()}/>
            </View>
            <Pressable style = {styles.priority} onPress={() => setPriority(true)}>
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
})