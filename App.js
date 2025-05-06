import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      nome: ''
    };

    this.gravaNome = this.gravaNome.bind(this);
  }

  async componentDidMount() {
    try {
      const nomeSalvo = await AsyncStorage.getItem('nome');
      if (nomeSalvo !== null) {
        this.setState({ nome: nomeSalvo });
      }
    } catch (error) {
      console.error('Erro ao recuperar nome: ', error);
    }
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.nome !== this.state.nome) {
      await AsyncStorage.setItem('nome', this.state.nome);
    }
  }

  gravaNome() {
    this.setState({ nome: this.state.input });
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            value={this.state.input}
            onChangeText={(text) => this.setState({ input: text })}
            placeholder="Digite seu nome"
          />
          <TouchableOpacity style={styles.botao} onPress={this.gravaNome}>
            <Text style={{ color: '#FFF', fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.nome}>{this.state.nome}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 350,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },
  botao: {
    backgroundColor: '#222',
    height: 40,
    justifyContent: 'center',
    padding: 10,
    marginLeft: 3,
  },
  nome: {
    marginTop: 15,
    fontSize: 30,
    textAlign: 'center',
  },
});
