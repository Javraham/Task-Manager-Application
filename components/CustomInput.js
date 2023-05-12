import React, { useState }  from 'react';
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, TextInput, Modal, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable} from 'react-native-gesture-handler';
import DetailPage from '../Pages/Details';
import { Ionicons } from '@expo/vector-icons';


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
            return(
                date && 
                    <View style = {{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <Icon name='calendar' color = {list.color} size = {15}/>
                        <Text style = {{paddingVertical: 3, color: 'grey'}}>
                            {isToday ? 'Today' : date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')}
                        </Text>
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
                ref={(swipe) => props.swipeRef[index] = swipe}>
                <View style = {{paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                    <View style = {{flexDirection: 'row', gap: 10}}>
                        <TouchableOpacity 
                            onPress={() => props.toggleCompleted(index)}>
                            <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {list.color} />
                        </TouchableOpacity>
                        <View>
                            <View style = {{flexDirection: 'row', flexGrow: 1}}>
                                {item.priority === 'High' && <Text style = {{fontSize: 16, color: '#0E86D4'}}>!!! </Text>}
                                <TextInput  maxLength = {40} autoFocus = {props.focus}
                                    onBlur = {() => props.checkInput(item, index)}
                                    onChangeText = {text => props.handleInput(text, item)} 
                                    defaultValue =  {item.name}
                                    editable = {edit && !item.completed}
                                    style = {{ fontSize: 16, flexGrow: 1, color: item.completed ? 'grey' : 'black'}} 
                                    />
                            </View>
                            {renderSubtext()}
                        </View>
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