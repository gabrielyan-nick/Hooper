import { createGlobalStyle } from "styled-components";
import normalize from "../../node_modules/modern-normalize/modern-normalize.css";

export default createGlobalStyle`
 ${normalize}
  body {
    height: 100%;
    width: 100%;
    font-family: 'Golos Text', sans-serif;
  }
  .mapboxgl-popup-content {
    background: none;
    box-shadow: none;
    padding: 0;
}
  .mapboxgl-popup-tip {
  display: none;
}
  p {
    margin: 0;
    padding: 0;
  }

.modal-overlay-appear {
  opacity: 0;
}

.modal-overlay-appear-done {
  opacity: 1;
  transition: opacity 300ms;
}

.modal-overlay-exit {
  opacity: 1;
}

.modal-overlay-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}

.modal-content-appear {
  opacity: 0;
  transform: scale(0.9);
}
.modal-content-appear-done {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}
.modal-content-exit {
  opacity: 1;
}
.modal-content-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}


.switch-enter{
   opacity: 0;
   transition: opacity 300ms, transform 300ms;
}
.switch-exit{
   opacity: 1;
  transition: opacity 300ms, transform 300ms;
}
.switch-enter-active{
   opacity: 1;
     transition: opacity 300ms, transform 300ms;
}
.switch-exit-active{
   opacity: 0;
  transition: opacity 300ms, transform 300ms;
}



`;
