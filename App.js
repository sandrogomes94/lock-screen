import { StyleSheet, Text, View, StatusBar, TextInput, ToastAndroid } from 'react-native';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { useState } from 'react';

export default function App() {

  const secret = '123456';
  const [password, setPassword] = useState();
  const [count, setCount] = useState();

  const wrongPassword = () => {
    ToastAndroid.showWithGravity(
      "Wrong password",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const correctPassword = () => {
    ToastAndroid.showWithGravity(
      "Correct password",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };

  function enterPassword(value) {
    if (value == 'back') {
      setPassword();
      setCount();
    } else {
      if (typeof (password) == 'undefined') {
        setPassword(value)
      } else {
        setPassword(password + value)
      }
      if (typeof (count) == 'undefined') {
        setCount(2);
      } else {
        setCount(count + 1);
      }
      if (count === 6) {
        setPassword();
        setCount();
        checkPassword(password + value);
      }
    }
  }

  function checkPassword(password) {
    if (password === secret) {
      correctPassword();
    } else {
      wrongPassword();
    }
  }

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.title}>Insira sua senha</Text>
        <TextInput secureTextEntry={true} value={password} style={styles.input} editable={false} ></TextInput>
        <VirtualKeyboard style={styles.keyboard} color='black' applyBackspaceTint={false} textStyle={{ paddingTop: 10, paddingBottom: 10 }} pressMode='char' onPress={(value) => enterPassword(value)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    width: '60%',
    textAlign: 'center',
    fontSize: 32,
    color: 'black',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 26,
    top: 40,
  },
  keyboard: {
    bottom: 20,
  }
});