import * as Notifications from "expo-notifications";
import moment from "moment";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const schedulePushNotification = (title, body, time, hours) => {
  const trigger = new Date(time);
  trigger.setHours(hours.split(":")[0]);
  trigger.setMinutes(hours.split(":")[1]);
  trigger.setSeconds(hours.split(":")[2]);

  //15  minute before 
  const date = new Date(time);
  date.setHours(hours.split(":")[0]);
  date.setMinutes(hours.split(":")[1]);
  date.setSeconds(hours.split(":")[2]);
  date.setMinutes(date.getMinutes() - 15);

  // console.log("trigger= ", trigger);
  // console.log("date= ", date);

  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: "goes here" },
    },
    trigger: trigger,
  })
    .then()
    .catch();

  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: "15 minute left to activity......",
      data: { data: "goes here" },
    },
    trigger: date,
  })
    .then()
    .catch();
};
