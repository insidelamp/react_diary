import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap');

html,
body {
  margin: 0;  
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  font-family: 'Instrument Serif', serif;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}



`;
export default GlobalStyles;
