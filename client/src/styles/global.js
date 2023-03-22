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

.photo-modal-overlay-appear,
.modal-overlay-appear {
  opacity: 0;
}
.photo-modal-overlay-appear-done,
.modal-overlay-appear-done {
  opacity: 1;
  transition: opacity 300ms;
}
.photo-modal-overlay-exit,
.modal-overlay-exit {
  opacity: 1;
}
.photo-modal-overlay-exit-active,
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
   transform: scale(0.95);
   transition: opacity 300ms, transform 400ms;
}
.switch-enter-active{
   opacity: 1;
   transform: scale(1);
     transition: opacity 300ms, transform 400ms;
}
.switch-exit{
   opacity: 1;
   transform: scale(1);
  transition: opacity 300ms, transform 400ms;
}
.switch-exit-active{
   opacity: 0;
   transform: scale(0.95);
  transition: opacity 300ms, transform 400ms;
}

.icons-switch-enter{
   opacity: 0.5;
   transform: scale(0.8);
   transition: opacity 300ms, transform 200ms;
}
.icons-switch-enter-active{
   opacity: 1;
   transform: scale(1);
     transition: opacity 300ms, transform 200ms;
}
.icons-switch-exit{
   opacity: 1;
   transform: scale(1);
  transition: opacity 300ms, transform 200ms;
}
.icons-switch-exit-active{
   opacity: 0.5;
   transform: scale(0.8);
  transition: opacity 300ms, transform 200ms;
}


`;
