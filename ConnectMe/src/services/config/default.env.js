"use strict";
let MS_MY_BUDDY_PUBLIC;
const ENV = "local";
if (ENV === "local") {
  MS_MY_BUDDY_PUBLIC = `http://localhost:3000`;
}
export default {
  NODE_ENV: "development",
  ENVIRONMENT: "local",
  MS_MY_BUDDY_PUBLIC,
};
