import { proxy } from "valtio";




const state = proxy({
  currentMode:"free"
});



export default state;