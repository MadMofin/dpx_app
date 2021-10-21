import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import Lead from "../screens/Lead/Lead";
import LeadsDetail from "../components/leads/LeadTabs/LeadDetail/LeadsDetailInfo";
import LeadTabs from "../components/leads/LeadTabs/LeadTabs";
import { Icon, Layout } from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import AddTask from "../components/leads/LeadTabs/LeadDetail/AddTask";
import AddAppointment from "../components/leads/LeadTabs/LeadDetail/AddAppointment";
import AddLead from "../components/leads/AddLead";
import AssignLead from "../components/leads/AssignLead";
import SendDocumentation from "../components/leads/documentation/SendDocumentation";
import Calling from "../components/leads/Calling";
import { Ionicons } from "@expo/vector-icons";
import useLead from "../hooks/useLead";
import useAuth from "../hooks/useAuth";
import { isAdmin } from "../utils/Authroles";
import _ from 'lodash';

const LeadStack = createStackNavigator();
const LeadMainStack = createStackNavigator();

const LeadMainStackScreen = ({ navigation }) => {
  const { selectedLeads, selectedStores, selectedCarTypes, setCheckBox, checkBox } = useLead();
  const { user } = useAuth();
  return (
    <LeadMainStack.Navigator>
      <LeadMainStack.Screen
        name="Leads"
        component={Lead}
        options={{
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => { 
              
              let aux = [];
              selectedStores.map(item => aux.push(item.split('/')[1]))

              let aux2 = [];
              selectedCarTypes.map(item => aux2.push(item.split('/')[1]))
              

              aux = _.uniqBy(aux);
              aux2 = _.uniqBy(aux2);
              if(aux.length > 1){
                Toast.show({
                  text1: "Los leads deben ser de la misma agencia",
                  type: "error",
                  position: "bottom",
                });
              }else if(aux2.length > 1){
                Toast.show({
                  text1: "Solo nuevos o seminuevos",
                  type: "error",
                  position: "bottom",
                });
              }else{
                navigation.navigate("AssignLead") 
              }
            
            
            }}
            disabled={selectedLeads.length < 1}
            >
              <Ionicons
                name="person-add-outline"
                size={25}
                style={{
                  display: user && user.tier && isAdmin(user.tier._id) ? 'flex' : 'none',
                  width: 25,
                  height: 25,
                  marginLeft: 20,
                  color: selectedLeads.length === 0 ? "#bbb" : "#5764b8",
                }}
                />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Layout style={{display:'flex',flexDirection:'row'}}><TouchableOpacity onPress={() => setCheckBox(!checkBox)}>
            <Ionicons
              name="create-outline"
              size={25}
              style={{
                width: 25,
                height: 25,
                marginRight: 10,
                color: "#5764b8",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddLead")}>
              <Ionicons
                name="add-circle-outline"
                size={25}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 20,
                  color: "#5764b8",
                }}
              />
            </TouchableOpacity></Layout>
          ),
        }}
      />
      <LeadMainStack.Screen name="LeadDetail" component={LeadsDetail} />

      <LeadMainStack.Screen
        name="LeadTabs"
        component={LeadTabs}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
             <Ionicons
                name="add-circle-outline"
                size={25}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 20,
                  color: "#5764b8",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </LeadMainStack.Navigator>
  );
};
const LeadStackScreen = () => (
  <LeadStack.Navigator mode="modal" headerMode="none">
    <LeadStack.Screen name="LeadMain" component={LeadMainStackScreen} />
    <LeadStack.Screen name="AddTask" component={AddTask} />
    <LeadStack.Screen name="AddAppointment" component={AddAppointment} />
    <LeadStack.Screen name="AddLead" component={AddLead} />
    <LeadStack.Screen name="AssignLead" component={AssignLead} />
    <LeadStack.Screen name="Calling" component={Calling} />
    <LeadStack.Screen name="SendDocumentation" component={SendDocumentation} />
  </LeadStack.Navigator>
);

export default LeadStackScreen;
