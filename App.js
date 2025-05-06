import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefa: '',
      lista: [],
      editandoId: null,
      tarefaEditada: '',
      modalVisible: false
    };
  }

  adicionarTarefa = () => {
    if (this.state.tarefa.trim() !== '') {
      const novaTarefa = {
        id: Date.now().toString(),
        texto: this.state.tarefa,
        concluida: false
      };
      this.setState(prevState => ({
        lista: [...prevState.lista, novaTarefa],
        tarefa: ''
      }));
      Keyboard.dismiss();
    }
  };

  alternarConclusao = (id) => {
    const novaLista = this.state.lista.map(item =>
      item.id === id ? { ...item, concluida: !item.concluida } : item
    );
    this.setState({ lista: novaLista });
  };

  excluirTarefa = (id) => {
    const novaLista = this.state.lista.filter(item => item.id !== id);
    this.setState({ lista: novaLista });
  };

  abrirModalEdicao = (item) => {
    this.setState({
      editandoId: item.id,
      tarefaEditada: item.texto,
      modalVisible: true
    });
  };

  salvarEdicao = () => {
    const novaLista = this.state.lista.map(item =>
      item.id === this.state.editandoId ? { ...item, texto: this.state.tarefaEditada } : item
    );
    this.setState({
      lista: novaLista,
      modalVisible: false,
      editandoId: null,
      tarefaEditada: ''
    });
  };

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => this.alternarConclusao(item.id)}>
        <Image
          source={require('./assets/sharingan.png')}
          style={[
            styles.sharinganIcon,
            item.concluida && { opacity: 1 },
            !item.concluida && { tintColor: '#555', opacity: 0.5 },
          ]}
        />
      </TouchableOpacity>

      <Text style={[styles.itemTexto, item.concluida && styles.itemConcluida]}>
        {item.texto}
      </Text>

      <TouchableOpacity onPress={() => this.abrirModalEdicao(item)}>
        <Feather name="edit" size={22} color="#FFA500" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.excluirTarefa(item.id)}>
        <Feather name="trash-2" size={22} color="#FF4444" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.barraNinja}>
            <Text style={styles.ninjaTitle}>Aldeia da Folha 🌿</Text>
          </View>

          <Text style={styles.title}>Lista Ninja 🥊</Text>

          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              value={this.state.tarefa}
              onChangeText={(text) => this.setState({ tarefa: text })}
              placeholder="Digite sua missão ninja"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.botao} onPress={this.adicionarTarefa}>
              <Text style={styles.botaoTexto}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.lista}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
            style={styles.lista}
          />

          <Modal visible={this.state.modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar missão</Text>
                <TextInput
                  style={styles.modalInput}
                  value={this.state.tarefaEditada}
                  onChangeText={(text) => this.setState({ tarefaEditada: text })}
                />
                <TouchableOpacity style={styles.salvarBotao} onPress={this.salvarEdicao}>
                  <Text style={styles.salvarTexto}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    paddingTop: 50,
  },
  barraNinja: {
    backgroundColor: '#333',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  ninjaTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'monospace'
  },
  inputArea: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#1c1c1c',
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
  },
  botao: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#111',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lista: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemTexto: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'cursive',
  },
  itemConcluida: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    opacity: 0.7,
  },
  icon: {
    marginHorizontal: 6,
  },
  sharinganIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    marginBottom: 10,
  },
  salvarBotao: {
    backgroundColor: '#FF4444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  salvarTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;