var session = require('../modules/session') // gets useState() variable
import { DashboardImage } from "../components/imports/DashboardImage"; // gets component to rerender

export function deleteImage() {// Delete user's image input
    session.setImage(undefined); // set image to null
    DashboardImage(); // rerender DashboardImage component
    console.log("Reset image to none")
  }