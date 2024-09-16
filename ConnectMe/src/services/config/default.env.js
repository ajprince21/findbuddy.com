"use strict";
let MS_MY_BUDDY_PUBLIC;
const ENV = "uat";
if (ENV === "local") {
  MS_MY_BUDDY_PUBLIC = `http://192.168.8.101:3000`;
} else {
  MS_MY_BUDDY_PUBLIC = `https://findmybuddy-api.onrender.com`;
}
export default {
  NODE_ENV: "development",
  ENVIRONMENT: "local",
  MS_MY_BUDDY_PUBLIC,
};
