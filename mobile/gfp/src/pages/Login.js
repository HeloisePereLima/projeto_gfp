import {View, Text, Button} from 'react-native'

export default function Login ({navigation}) {
    return(
        <View>
            <Text>login</Text>
            <Button title='Entrar' color={'#f00'} onPress={() => navigation.navigate('MenuDrawer')}></Button>
        </View>
    )
}