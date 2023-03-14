import { createGlobalStyle } from "styled-components";
import normalize from "../../node_modules/modern-normalize/modern-normalize.css";

export default createGlobalStyle`
 ${normalize}
  body {
    height: 100%;
    width: 100%;
    font-family: 'Nunito', sans-serif;
  }
`;
