import "./reset.css";
import "./style.css";
import { $sketch } from "./parts/sketch";

const canvas = document.querySelector("canvas");
if (canvas) {
  $sketch(canvas);
}
