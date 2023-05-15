import React, { useState, useRef }  from 'react';
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, Modal, Pressable, Animated, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable} from 'react-native-gesture-handler';
import DetailPage from '../Pages/Details';
import { Ionicons, AntDesign } from '@expo/vector-icons';


function CustomInput({item, index, list, subtext, ...props}) {

    const [edit, setEdit] = useState(true)
    const [infoVisible, setVisible] = useState(false)

    const rightView = (drag, index, item) => {
        const opacity = drag.interpolate({
            inputRange: [-80, -50, -25, 0],
            outputRange: [1, 0.6, 0.4, 0],
            extrapolate: 'clamp'
        })
        return (
                <>
                    <Pressable onPress={() => props.handleDelete(index)}>
                        <Animated.View style = {[styles.delete, {opacity: opacity}]}>
                            <Icon name = 'trash' color = 'white' size ={25}/>
                        </Animated.View>
                    </Pressable>
                    <Pressable onPress={() => setVisible(true)}>
                        <Animated.View style = {[styles.delete, {opacity: opacity, backgroundColor: list.color}]}>
                            <Ionicons name = 'information-circle-outline' color = 'white' size ={30} />
                        </Animated.View>
                    </Pressable>
                </>
        )
    }

    renderSubtext = () => {
        if (subtext === 'date'){
            const date = item.Date !== null ? (!(item.Date instanceof Date) ? item.Date.toDate() : item.Date) : null
            const isToday = date !== null ? (date.getDate() === new Date().getDate() && 
                    date.getMonth() === new Date().getMonth() && 
                    date.getFullYear() === new Date().getFullYear()) : null
            const present = date === null ? null : 
                            date.getFullYear() < new Date().getFullYear() ? false : 
                            date.getMonth() < new Date().getMonth() && date.getFullYear() === new Date().getFullYear() ? false :
                            date.getDate() < new Date().getDate() && date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() ? false :
                            true
            return(
                date &&
                    <View style = {{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <Icon name='calendar' color = {list.color} size = {15}/>
                        <Text style = {{paddingVertical: 3, color: !present ? 'red' : 'grey'}}>
                            {isToday ? 'Today' : date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')}
                        </Text>
                        {!present && <AntDesign name='exclamationcircleo' color={'red'} size={15} />}
                    </View>
            )
        }

        else{
            return(
                <Text style = {{color: 'grey', paddingVertical: 3}}>{list.category}</Text>
            )
        }
    }


    return (
        <>
            <Modal visible = {infoVisible} animationType='slide' transparent>
                <DetailPage list = {list} 
                    close = {() => setVisible(false)} 
                    item = {item} 
                    index = {index}
                    update = {props.updateList}/>
            </Modal>
            <Swipeable 
                renderRightActions={(_, drag) => rightView(drag, index, item)} 
                onSwipeableWillOpen={() => setEdit(false)}
                onSwipeableWillClose={() => setEdit(true)}
                ref={(swipe) => props.swipeRef[index] = swipe}
                >
                    <View style = {{flexDirection: 'row', gap: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                        <TouchableOpacity 
                            onPress={() => props.toggleCompleted(index)}>
                            <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {list.color} />
                        </TouchableOpacity>
                        <View style = {{flexGrow: 1}}>
                            <View style = {{flexDirection: 'row', alignItems: 'center', flexGrow: 1}}>
                                {item.priority === 'High' && <Text style = {{fontSize: 16, color: '#0E86D4'}}>!!! </Text>}
                                <TextInput  autoFocus = {props.focus}
                                    onBlur = {() => props.checkInput(item, index)}
                                    onChangeText = {text => props.handleInput(text, item)} 
                                    defaultValue =  {item.name}
                                    editable = {edit}
                                    maxLength={40}
                                    style = {{ fontSize: 16, flexGrow: 1, color: 'black'}}
                                    returnKeyType="done" 
                                    />
                            </View>
                            {renderSubtext()}
                        </View>
                    </View>

            </Swipeable>
        </>
    );
}

export default CustomInput;

const styles = StyleSheet.create({
    delete: {
        backgroundColor: '#E55451',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 80
    },
})