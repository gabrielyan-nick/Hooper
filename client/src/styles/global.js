import { createGlobalStyle } from "styled-components";
import normalize from "../../node_modules/modern-normalize/modern-normalize.css";
import Berlinfont from "../assets/fonts/berlinsansfb_reg.ttf";

export default createGlobalStyle`
 ${normalize}
@font-face {
  font-family: 'Berlin';
  src: url(${Berlinfont}) format('truetype');
  font-weight: normal;
    font-style: normal;
}

  body, #root, .App, main {
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
p, ul, li {
    margin: 0;
    padding: 0;
  }

.photo-modal-overlay-appear,
.modal-overlay-appear {
  opacity: 0;
  /* transition: opacity 200ms; */
}
.photo-modal-overlay-appear-done,
.modal-overlay-appear-done {
  opacity: 1;
  transition: opacity 200ms;
}
.photo-modal-overlay-exit,
.modal-overlay-exit {
  opacity: 1;
  transition: opacity 200ms;
}
.photo-modal-overlay-exit-active,
.modal-overlay-exit-active {
  opacity: 0;
}

.modal-content-appear {
  opacity: 0;
  transform: scale(0.99);
  transition: opacity 200ms, transform 200ms;
}
.modal-content-appear-done {
  opacity: 1;
  transform: scale(1);
}
.modal-content-exit {
  opacity: 1;
  transform: scale(1);
}
.modal-content-exit-active {
  opacity: 0;
  transform: scale(0.99);

}

.switch-enter{
   opacity: 0;
   transform: scale(0.99);
   transition: opacity 200ms, transform 300ms;
}
.switch-enter-active{
   opacity: 1;
   transform: scale(1);
  transition: opacity 200ms, transform 300ms;
}
.switch-exit{
   opacity: 1;
}
.switch-exit-active{
   opacity: 0;
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


.select-switch-enter{
   opacity: 0.5;
   transform: scale(0.93);
   transition: opacity 300ms, transform 300ms;
}
.select-switch-enter-active{
   opacity: 1;
   transform: scale(1);
  transition: opacity 300ms, transform 300ms;
}
.select-switch-exit{
   opacity: 1;
   transform: scale(1);
  transition: opacity 300ms, transform 300ms;
}
.select-switch-exit-active{
   opacity: 0.5;
   transform: scale(0.93);
  transition: opacity 300ms, transform 300ms;
}

.court-enter {
  opacity: 0;
}
.court-enter-done {
  opacity: 1;
  transition: opacity 300ms;
}
.court-exit {
  opacity: 1;
  transition: opacity 300ms;
}
.court-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}

.roll-hide-enter {
  opacity: 0;
  transform: translateX(100%) rotate(100deg);
} 
.roll-hide-enter-done {
  opacity: 1; 
  transform: translateX(0%) rotate(0deg);
  transition: all 500ms;
}
.roll-hide-exit {
  opacity: 1;
  transform: translateX(0%) rotate(0deg);
  transition: all 500ms;
}
.roll-hide-exit-active {
  opacity: 0;
  transform: translateX(100%) rotate(100deg);
  transition: all 500ms;
}


.loading-hide-exit {
  transform: translateX(0);
  transition: transform 1700ms;
}
.loading-hide-exit-active {
  transform: translateX(-150%);
  transition: transform 1700ms;
}
`;
