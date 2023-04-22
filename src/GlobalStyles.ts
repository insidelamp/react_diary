import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap');

body {
  margin: 0;  
  font-family: 'Instrument Serif', serif;
}

`;
export default GlobalStyles;
