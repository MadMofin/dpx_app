import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import HeaderTitle from "../../../header/HeaderTitle";
<<<<<<< HEAD
import useAppointment from "../../../../hooks/useAppointment";
import useComment from "../../../../hooks/useComment";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
=======
import useAppointment from '../../../../hooks/useAppointment';
import useComment from '../../../../hooks/useComment';
import useAuth from '../../../../hooks/useAuth';
import moment from "moment/min/moment-with-locales";
>>>>>>> 60345b2bbfae880547c70a06cf2d376e1658f36f
import {
  Layout,
  Divider,
  Text,
  CheckBox,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Calendar,
  Input,
} from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import useLead from "../../../../hooks/useLead";
import { translateActions } from "../../../../utils/tranlsateSubstatus";

const AddAppointment = ({ navigation }) => {
  const { createAppointment } = useAppointment();
  const { createComment, updateComment } = useComment();
  const { lead, updateLead } = useLead();
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState("");
  const [hour, setHour] = useState(new Date());
  const [selectedAction, setSelectedAction] = useState(new IndexPath(0));
  const actions = ["information", "documentation", "driving test"];
  const times = ["1 Hora", "2 Horas"];
  const [time, setTime] = useState({ row: 0 });
  const displayValue = actions[selectedAction.row];
  const displayValueTime = times[time.row];
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

<<<<<<< HEAD
  const handleSubmit = async () => {
    if (values.description === "" || values.title === "") {
=======
  moment.locale('es-mx')
  const handleSubmit = async() =>{
    if(values.description === '' || values.title === ''){
>>>>>>> 60345b2bbfae880547c70a06cf2d376e1658f36f
      return Toast.show({
        text1: "Fill all the fields",
        type: "error",
        position: "bottom",
      });
    }
    let endDate = moment(finalDate).add(time.row + 1, "hours");

    ////
    let BodyComment = {
      comment: values.description,
      user: user._id,
      action: ["appointment"],
      store: lead.store._id,
    };

    await createComment(BodyComment, lead._id);

    if (lead && lead.comments && lead.comments.length > 0) {
      await updateComment({ pending: false }, lead.comments[0]._id);
    }
    /////

    await createAppointment({
      ...values,
      startDate: finalDate,
      endDate,
      action: displayValue,
      substatus: "605bd6b0bed49524ae40f885",
      store: lead.store._id,
      user: lead.agent._id,
      lead: lead._id,
      email: lead.email,
      customer: lead.name,
    });

    let updateLeadBody = {
      status: "604f80222b372e0cb11966dc",
      substatus: "605bd6b0bed49524ae40f885",
      isContacted: true,
    };

    if (!lead.firstTask) {
      updateLeadBody.firstTask = new Date();
    }

    await updateLead(updateLeadBody, lead._id);

    Toast.show({
      text1: "Cita Creada",
      type: "success",
      position: "bottom",
    });

    navigation.navigate("LeadTabs");
<<<<<<< HEAD
  };
=======

  }

  React.useEffect(()=>{
    if(hour && date){
      let finalDate = date.toString().split(' ')
      let finalHour = hour.toString().split(' ')
      let postDate = `${finalDate[0]} ${finalDate[1]} ${finalDate[2]} ${finalDate[3]} ${finalHour[4]} ${finalDate[5]} ${finalDate[6]}`
      setFinalDate(postDate)
    }
  },[hour])
>>>>>>> 60345b2bbfae880547c70a06cf2d376e1658f36f

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const renderAndroidPicker = (state) => {
    if (state === true) {
      return (
        <>
          <DateTimePicker
            value={hour}
            mode="time"
            display="spinner"
            onChange={onChangeAndroidHour}
          />
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChangeAndroid}
          />
        </>
      );
    }
  };

  const onChangeAndroidHour = (event, selectedTime) => {
    if (selectedTime !== undefined) {
<<<<<<< HEAD
      let finalDate = date.toString().split(" ");
      let finalHour = selectedTime.toString().split(" ");

      let postDate = `${finalDate[0]} ${finalDate[1]} ${finalDate[2]} ${finalDate[3]} ${finalHour[4]} ${finalDate[5]} ${finalDate[6]}`;
      setHour(selectedTime);
      setFinalDate(postDate);
=======
      setHour(selectedTime);
>>>>>>> 60345b2bbfae880547c70a06cf2d376e1658f36f
    }
  };

  const onChangeAndroid = (event, selectedDate) => {
    setOpen(false);
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
  };

  let paddingTop = 0;

  if(Platform.OS === 'android'){
    paddingTop = 30;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" ,paddingTop}}>
      <HeaderTitle title="Agregar Cita" />
      <ScrollView>
        <Layout
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginBottom: 10,
          }}
          level="1"
        >
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            1. Deja un comentario
          </Text>
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            level="1"
          >
            <Input
              placeholder="Comentario"
              style={{ minWidth: 400 }}
              value={values.title}
              onChangeText={(string) => {
                setValues({ ...values, title: string });
              }}
            />
          </Layout>
        </Layout>

        <Layout
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginBottom: 20,
          }}
          level="1"
        >
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            2. Deja una descripción
          </Text>
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            level="1"
          >
            <Input
              multiline={true}
              placeholder="Descripción"
              style={{ minWidth: 400 }}
              value={values.description}
              onChangeText={(string) => {
                setValues({ ...values, description: string });
              }}
            />
          </Layout>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            3. Elige una acción
          </Text>
<<<<<<< HEAD
          <Select
            size="large"
            style={{ marginBottom: 10 }}
            value="Selecciona"
            selectedIndex={selectedAction}
            value={displayValue}
            onSelect={(index) => setSelectedAction(index)}
          >
            {actions.map((action, i) => (
              <SelectItem title={action} key={i} />
=======
          <Select size="large" 
            style={{ marginBottom: 10 }} 
            value="Selecciona" 
            selectedIndex={selectedAction} 
            value={translateActions(displayValue)}
            onSelect={(index) => setSelectedAction(index)}>
            {actions.map((action, i) => (
              <SelectItem title={translateActions(action)} key={i}  />
>>>>>>> 60345b2bbfae880547c70a06cf2d376e1658f36f
            ))}
          </Select>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            4. Elige una Fecha
          </Text>
<<<<<<< HEAD
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            {Platform.OS === "android"
              ? `Fecha: ${
                  finalDate &&
                  moment(finalDate).format("DD MMMM YYYY - HH:MM a")
                }`
              : `Fecha`}
=======
          <Text
            style={styles.text}
            category="s1"
            style={{ marginBottom: 20 }}
          >
            {
              Platform.OS === 'android' ? 
              `Fecha de Inicio: ${finalDate && moment(finalDate).format('DD MMMM YYYY - hh:mm a')}` :
              `Fecha de Inicio`
            } 
>>>>>>> 60345b2bbfae880547c70a06cf2d376e1658f36f
          </Text>
          {Platform.OS === "ios" && (
            <DateTimePicker
              value={date}
              mode="datetime"
              onChange={onChange}
              display="spinner"
            />
          )}
          {Platform.OS === "android" && (
            <Button
              style={{ marginBottom: 20, marginTop: 20 }}
              onPress={() => setOpen(true)}
            >
              Seleccionar Fecha
            </Button>
          )}
          {Platform.OS === "android" && renderAndroidPicker(open)}
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            5. Elige el tiempo de la cita
          </Text>
          <Select
            size="large"
            style={{ marginBottom: 10 }}
            onSelect={(index) => setTime(index)}
            value="Selecciona"
            value={displayValueTime}
          >
            {times.map((action, i) => (
              <SelectItem title={action} key={i} />
            ))}
          </Select>
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Button style={styles.button} onPress={handleSubmit}>
            Crear Cita
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    margin: 2,
  },
  button: {
    marginTop: 20,
  },
});

export default AddAppointment;
