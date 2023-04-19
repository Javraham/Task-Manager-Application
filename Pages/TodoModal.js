import React from 'react';
import {View, TouchableOpacity, Text, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


class TodoModal extends React.Component {


    render(){
        return (
            <View style = {{position: 'absolute', top: 50}}>
                <Button title = 'close' onPress = {this.props.close}/>
            </View>
        );
    }
}

export default TodoModal;