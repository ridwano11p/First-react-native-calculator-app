import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  View,
  FlatList,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notebook = () => {
  const [notes, setNotes] = useState("");
  const [notebooks, setNotebooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [writeMode, setWriteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredNotebooks, setFilteredNotebooks] = useState([]);
  const [color, setColor] = useState("white");

  useEffect(() => {
    loadNotebooks();
  }, []);

  useEffect(() => {
    filterNotebooks();
  }, [searchText, notebooks]);

  const loadNotebooks = async () => {
    try {
      let storedNotebooks = await AsyncStorage.getItem("notebooks");
      if (storedNotebooks) {
        setNotebooks(JSON.parse(storedNotebooks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveNotebooks = async () => {
    try {
      await AsyncStorage.setItem("notebooks", JSON.stringify(notebooks));
    } catch (error) {
      console.error(error);
    }
  };

  const filterNotebooks = () => {
    if (searchText) {
      let filtered = notebooks.filter(
        (notebook) =>
          notebook.name.toLowerCase().includes(searchText.toLowerCase()) ||
          notebook.notes.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredNotebooks(filtered);
    } else {
      setFilteredNotebooks(notebooks);
    }
  };

  const handleWrite = () => {
    setWriteMode(true);
  };

  const handleSave = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (editMode) {
      let updatedNotebooks = [...notebooks];
      updatedNotebooks[editIndex] = { name: name, notes: notes, color: color };
      setNotebooks(updatedNotebooks);
      setEditMode(false);
      setEditIndex(null);
    } else {
      setNotebooks([...notebooks, { name: name, notes: notes, color: color }]);
    }
    setModalVisible(false);
    setName("");
    setNotes("");
    setColor("white");
    setWriteMode(false);
    saveNotebooks();
  };

  const handleEdit = (index) => {
    let notebook = notebooks[index];
    setName(notebook.name);
    setNotes(notebook.notes);
    setColor(notebook.color);
    setEditMode(true);
    setEditIndex(index);
    setWriteMode(true);
  };

  const handleDelete = (index) => {
    let updatedNotebooks = [...notebooks];
    updatedNotebooks.splice(index, 1);
    setNotebooks(updatedNotebooks);
    saveNotebooks();
  };

  const renderItem = ({ item, index }) => {
    return (
      <Swipeable
        renderRightActions={() => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => handleEdit(index)}
              style={{ backgroundColor: "yellow", padding: 10 }}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(index)}
              style={{ backgroundColor: "red", padding: 10 }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold", backgroundColor: item.color }}>
            {item.name}
          </Text>
          <Text>{item.notes}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView>
      {writeMode ? (
        <>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Write some notes here..."
            multiline={true}
          />
          <Picker
            selectedValue={color}
            onValueChange={(itemValue) => setColor(itemValue)}
          >
            <Picker.Item label="White" value="white" />
            <Picker.Item label="Red" value="red" />
            <Picker.Item label="Green" value="green" />
            <Picker.Item label="Blue" value="blue" />
            <Picker.Item label="Yellow" value="yellow" />
          </Picker>
          <TouchableOpacity onPress={handleSave}>
            <Text>Save</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View style={{ backgroundColor: "white", padding: 20 }}>
                <Text>Enter a name for your notebook:</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Name"
                />
                <TouchableOpacity onPress={handleConfirm}>
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search notebooks..."
          />
          <FlatList
            data={filteredNotebooks}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
          <TouchableOpacity
            onPress={handleWrite}
            style={{ backgroundColor: "blue", padding: 10 }}
          >
            <Text style={{ color: "white" }}>Write a note</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Notebook;
