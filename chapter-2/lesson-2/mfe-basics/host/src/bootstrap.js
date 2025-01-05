import { mount as listMount } from "list/ListIndex";
import { mount as cartMount } from "cart/CartShow";

console.log("I am a Host !");

listMount(document.querySelector("#host-list"));
cartMount(document.querySelector("#host-cart"));
