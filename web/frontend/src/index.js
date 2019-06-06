import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap-css-only/css/bootstrap.css';
import "mdbreact/dist/css/mdb.css";
import '@fortawesome/fontawesome-free/css/all.css'
import App from './App';
import { MDBIcon } from 'mdbreact';
import styled from 'styled-components';
import { black } from 'ansi-colors';


const VincentFooter = styled.footer`
  margin-bottom: 2em;
  font-size: 1.2em;
`;

ReactDOM.render(
    <App />,
    document.getElementById('root'));
ReactDOM.render(
    <VincentFooter>
        <a href="https://github.com/VicenzoMartinelli" style={{ color: black }}>
            Powered by Vicenzo with <MDBIcon fab icon="react" /> and <MDBIcon fab icon="node-js" />
        </a>
    </VincentFooter>,
    document.getElementById('footer'));