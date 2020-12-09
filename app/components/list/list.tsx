import React, {useState} from 'react';
import {Text, View, TextInput } from 'react-native';

export default function List() {

const [ingredient, setIngredient] = useState([
    {name: 'lemon', key: '1'},
    {name: 'chicken', key: '2'},
    {name: 'asparagus', key: '3'},
    {name: 'spinach', key: '4'},
]);

return (
    <View>
        { ingredient.map((item) => {
            return (
            <View key={item.key}>
                <Text>(item.name)</Text>
            </View>
            )
        })}
    </View>
)

}