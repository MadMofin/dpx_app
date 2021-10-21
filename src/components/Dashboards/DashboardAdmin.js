import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Layout,
  Text,
  Divider,
  Icon,
  List,
  ListItem,
  Button,
} from "@ui-kitten/components";
import Calendar from "../../components/SelectDate";
import SelectCarType from "../SelectCarType";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import useChart from "../../hooks/useChart";
import useAuth from "../../hooks/useAuth";
import { CapitalizeNames } from "../../utils/Capitalize";
import { getMultiStoresIds } from "../../utils/storesUser";
import { Spinner } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import ChartsUser from "../Charts/ChartsUser";
import { ScrollView } from "react-native-gesture-handler";
import TopList from "./dashboardComponents/TopList";
import numeral from 'numeral';

const HomeAdmin = ({ navigation }) => {
  const { user } = useAuth();
  const {
    getTotalsDashboard,
    total,
    totalLeads,
    totalAppointments,
    totalVisits,
    totalSolds,
    loadingCharts,
    clearCharts,
    getLeadsMonthlyChart,
    leadsMonthlyChart,
    getPieStatusChart,
    pieStatus,
    getClosureTopUsers,
    closureTopUsers,
  } = useChart();
  // const [custom, setCustom] = useState("D MMM");

  const [custom, setCustom] = useState({
    date: `&createdAt[gte]=${moment()
      .startOf("year")
      .format()}&createdAt[lt]=${moment().endOf("month").format()}`,
    filter: "MMM",
  });
  const [date, setDate] = useState(
    `&createdAt[gte]=${moment()
      .startOf("month")
      .format()}&createdAt[lt]=${moment().endOf("month").format()}`
  );

  const [carType, setCarType] = useState(false);

  const today = new Date();
  const curHr = today.getHours();

  let greeting;

  if (curHr < 12) {
    greeting = "Buenos Dias";
  } else if (curHr < 18) {
    greeting = "Buenas Tardes";
  } else {
    greeting = "Buenas Noches";
  }

useFocusEffect(
    React.useCallback(() => {
      if (user && user._id && carType) {
        getTotalsDashboard(
          `${date}&store[in]=${getMultiStoresIds(user.stores)}&carType=${carType}`
        );
        getPieStatusChart(
          `${date}&store[in]=${getMultiStoresIds(user.stores)}&carType=${carType}`
        );
        getClosureTopUsers(`${date}&store=${getMultiStoresIds(user.stores)}&carType=${carType}`);

        let customDate = `&createdAt[gte]=${moment().startOf("year").format()}&createdAt[lt]=${moment().endOf("month").format()}&carType=${carType}`;
        let customFilter = "MMM";
        getLeadsMonthlyChart(`${customDate}&store[in]=${getMultiStoresIds(user.stores)}&filter=${customFilter}&carType=${carType}`);
      }
    }, [date, user, carType])
  );

  React.useEffect(() => {
    clearCharts();
  }, []);
  const data = [];

  return (
    <ScrollView>
      <Layout style={styles.container}>
      <Layout style={styles.subContainer}>
          <Calendar setDate={setDate} getFilter={setCustom} />
          <SelectCarType carType={carType} setCarType={setCarType} />
        </Layout>
        <Layout style={styles.subContainerText}>
          <Text
            category="label"
            style={{ fontSize: 28, marginTop: 0 }}
          >{`${greeting}, ${user && CapitalizeNames(user.name)}`}</Text>
          {loadingCharts ? (
            <Text
              category="p1"
              appearance="hint"
            >{`Estamos contando los leads`}</Text>
          ) : (
            <Text category="p1">{`Tienes un total de ${numeral(total).format('0,0')} leads acumulados`}</Text>
          )}
        </Layout>
        <Divider />
        

        <Layout style={styles.subContainerCards}>
          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Leads
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="person-outline" size={25} color={"#673ab7"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalLeads).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>

          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Citas
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="calendar-outline" size={25} color={"#33acee"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalAppointments).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>
        </Layout>

        <Layout style={styles.subContainerCards}>
          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Visitas
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="home-outline" size={25} color={"#d81b60"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalVisits).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>

          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Ventas
            </Text>
            <Layout style={styles.data}>
              {/* <Ionicons name="cash-outline" size={25} color={"#43a047"} /> */}
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalSolds).format('0,0')}
                </Text>
              )}
            </Layout>
          </Layout>
        </Layout>

        <Layout style={styles.subContainerDivider}>
          {!leadsMonthlyChart || !pieStatus ? (
            <Layout style={styles.center}>
              <Spinner size="giant" />
            </Layout>
          ) : (
            <>
              <Divider />
              <ChartsUser leads={leadsMonthlyChart} status={pieStatus} />
            </>
          )}
        </Layout>
      </Layout>
      <TopList
          data={closureTopUsers?closureTopUsers:data}
          title="Top 10 Ventas"
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 15,
  },
  container: {
    marginBottom: 20,
    flex: 1,
  },
  subContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingRight:10,
    width:'98%',
    margin:'auto',
    marginTop:15
  },
  subContainerText: {
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 25,
    paddingBottom: 10,
  },
  subContainerDivider: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  subContainerCards: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
  },
  card: {
    width: "50%",
    borderWidth: 1,
    flex: 1,
    borderColor: "#d8d8d8",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  data: {
    display: "flex",
    flexDirection: "row",
    textAlignVertical: "center",
  },
  center: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
});

export default HomeAdmin;
