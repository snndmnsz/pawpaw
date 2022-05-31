import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const schedulePushNotification = (title, body, time, hours) => {
  console.log(time);
  const trigger = new Date(time);
  trigger.setHours(hours.split(":")[0]);
  trigger.setMinutes(hours.split(":")[1]);
  trigger.setSeconds(hours.split(":")[2]);

  console.log(trigger);

  //set a date for 15  minute later from time and hour
  //   const date = new Date(time);
  //   date.setMinutes(date.getMinutes() + 15);

  //TODO: set a date for 15  minute later from time and hour

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
};
