import React, { Component } from 'react';
import './Login.css';
import { MDBIcon, MDBBtn }  from "mdbreact";

export default class Login extends Component {
    state = {
        username: ''
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let { username } = this.state;

        if (!username.length) return;

        localStorage.setItem('@GoTwitter:username', username);
        this.props.history.push('/timeline');
    }

    handleInputChange = (from, event) => this.setState({
        [from]: event.target.value
    });

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    render() {
        return (
            <div className="login-wrapper">
                <MDBIcon fab icon="connectdevelop" size="4x" />
                <form>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange.bind(this, 'username')}
                        placeholder="Nome do usuário" />
                    <MDBBtn type="submit" color="elegant" onClick={this.handleSubmit}>Entrar</MDBBtn>
                </form>
            </div>
        );
    }
}
