"use strict";
let MS_MY_BUDDY_PUBLIC;
const ENV = "local";
if (ENV === "local") {
  MS_MY_BUDDY_PUBLIC = `http://192.168.8.109:3000`;
}
export default {
  NODE_ENV: "development",
  ENVIRONMENT: "local",
  MS_MY_BUDDY_PUBLIC,
};
