import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import Icons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native-web";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../redux/slice/myPetSlice";
import moment from "moment";

import {
  getAllActivities,
  deleteAActivity,
} from "../../database/tables/activities";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "en";

const food = { color: "#FC3090" };
const play = { color: "#1DA8B1" };
const sleep = { color: "#2871C8" };
const toilet = { color: "#9B51E0" };
const walk = { color: "#FFA500" };
const vet = { color: "#00BFFF" };
const vaccine = { color: "#8D8DAA" };

//KEY ekeleme olayi var burda lol

const CustomCalender = () => {
  const dotsData = {
    food: food,
    play: play,
    sleep: sleep,
    toilet: toilet,
    walk: walk,
    vet: vet,
    vaccine: vaccine,
  };

  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [markedDates, setMarkedDates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const setSelectedDateHandler = (day) => {
    const newMarkedDates = { ...markedDates };
    Object.keys(newMarkedDates).forEach((key) => {
      if (newMarkedDates[key].selected) {
        newMarkedDates[key].selected = false;
      }
    });
    if (newMarkedDates[day]) {
      newMarkedDates[day].selected = true;
    } else {
      newMarkedDates[day] = {
        selected: true,
        dots: [],
      };
    }
    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    if (isFocused) {
      setMarkedDates({});
      const today = new Date();
      const todayDate = moment(today).format("YYYY-MM-DD");
      dispatch(setSelectedDate(today.toISOString()));
      // setSelectedDateHandler(todayDate);

      setIsLoading(true);
      getAllActivities(currentPetId)
        .then((activities) => {
          const openingMarkedDates = {};
          openingMarkedDates[todayDate] = {
            selected: true,
            dots: [],
          };
          activities.forEach((activity) => {
            const activityDate = moment(activity.date).format("YYYY-MM-DD");
            //check if  date is not in openingMarkedDates then create new object
            if (!openingMarkedDates[activityDate]) {
              openingMarkedDates[activityDate] = {
                selected: todayDate === activityDate ? true : false,
                dots: [dotsData[activity.activityType]],
              };
            } else if (openingMarkedDates[activityDate]) {
              openingMarkedDates[activityDate] = {
                selected: todayDate === activityDate ? true : false,
                dots: [
                  ...openingMarkedDates[activityDate].dots,
                  dotsData[activity.activityType],
                ],
              };
            }
          });
          setMarkedDates(openingMarkedDates);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused,currentPetId]);

  return (
    <View style={styles.calenderContainer}>
      <Calendar
        // Initially visible month. Default = now
        // current={"2012-03-01"}

        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2018-05-10"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2023-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          //console.log("selected day", day.timestamp);
          const today = new Date().toISOString().split("T")[1];
          dispatch(setSelectedDate(`${day.dateString}T${today}`));
          // console.log(`${day.dateString}T${today}`);

          setSelectedDateHandler(day.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          //console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          //console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        // hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => {
          if (direction == "left") {
            return <Icons name="chevron-back-outline" size={24} color="#000" />;
          } else if (direction == "right") {
            return (
              <Icons name="chevron-forward-outline" size={24} color="#000" />
            );
          }
        }}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => {
          const index = Platform.OS === "android" ? 1 : 0;
          return (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginRight: 10 }}
              >
                {new Date(selectedDate)?.getFullYear()}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: isLoading ? 8 : 0,
                }}
              >
                {moment(selectedDate)
                  ?.locale("en")
                  .format("MMMM  DD")
                  .toUpperCase()}
              </Text>
            </View>
          );
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        markingType={"multi-dot"}
        markedDates={markedDates}
        displayLoadingIndicator={isLoading}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#E6EDFA",
          selectedDayTextColor: "#007FFF",
          todayTextColor: "#EE7942",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          //   dotColor: "#00adf5",
          //   selectedDotColor: "#007FFF",
          //   arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "blue",
          indicatorColor: "blue",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 15,
          textMonthFontSize: 14,
          textDayHeaderFontSize: 14,
        }}
      />
    </View>
  );
};

export default CustomCalender;

const styles = StyleSheet.create({
  calenderContainer: {
    // height: "100%",
  },
});
