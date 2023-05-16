import React, { useRef, useState } from 'react';
import { View,Text, StyleSheet, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SummaryPage from '../Pages/SummaryPage'
import PriorityPage from '../Pages/PriorityPage';
import ScheduledPage from '../Pages/ScheduledPage';

function Summary(props) {
    const [visible, setVisibility] = useState(false)

    switch(props.title){
        case 'Completed': percentage = () => Completed(); break;
        case 'All': percentage = () => All(); break;
        case 'Priorities': percentage = () => Priorities(); break;
        case 'Scheduled': percentage = () => Scheduled(); break;
        default: percentage = () => {return 0};
    }
    

    const Completed = () => {
        const numComp = props.list.reduce((sum, val) => {
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
        const numLowPriorities = props.list[0].reduce((sum, val) => {
            return sum + val.todo.length
        }, 0);

        const numHighPriorities = props.list[1].reduce((sum, val) => {
            return sum + val.todo.length
        }, 0);

        return numHighPriorities+numLowPriorities
    }

    const Scheduled = () => {
        const numScheduled = props.list.reduce((sum, val) => sum + val.todo.length, 0)
        return numScheduled;
    }

    const ScheduledList = () => {
        const s = new Map()
        if (props.title === 'Scheduled'){
            props.list.forEach((value) => {
                value.todo.forEach(todo => {
                    const date =  todo.Date.toDate().toISOString().split('T')[0]
                    if(s.has(date)){
                        if(s.get(date).some(obj => obj.id === value.id)){
                            s.get(date)[s.get(date).findIndex(obj => obj.id === value.id)].todo.push(todo)
                        } else{
                            s.get(date).push({...value, todo: [todo]})
                        }
                    } else{
                        s.set(date, [{...value, todo: [todo]}])
                    }
                })
            })
        }
        
        return Array.from(s).sort((a, b) => {
            const dateA = new Date(a[0]);
            const dateB = new Date(b[0])
            return dateA - dateB;
        })
    }

    console.log(ScheduledList())
    
    const renderPage = () => {
        if (props.title === 'Completed' || props.title === 'All'){
            return (
                <SummaryPage 
                    list = {props.list} 
                    title = {props.title} color = {props.color}
                    icon = {props.iconName}
                    close = {() => setVisibility(false)}
                    />
            )
        } else if (props.title === 'Priorities'){
            return(
                <PriorityPage 
                    list = {props.list}
                    title = {props.title} 
                    color = {props.color} 
                    close = {() => setVisibility(false)}
                    icon = {props.iconName}
                    />
            )
        } else {
            return(
                <ScheduledPage 
                    list = {ScheduledList()}
                    title = {props.title} 
                    color = {props.color} 
                    close = {() => setVisibility(false)}
                    icon = {props.iconName}
                    />
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