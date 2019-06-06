import './Timeline.css';
import React, { Component } from 'react';
import ReactDropzone from "react-dropzone";
import Api from '../services/Api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
import { MDBBtn, MDBIcon } from "mdbreact";
import ImageUpload from '../components/ImageUpload';

export default class Timeline extends Component {
    state = {
        tweets: [],
        showClean: false,
        newTweet: '',
        img: null
    };

    async componentDidMount() {

        if(localStorage.getItem('@GoTwitter:username') == null || localStorage.getItem('@GoTwitter:username').trim() === '')
        {
            alert('aqui não');
            this.props.history.push('/login');
        }

        this.subscribeToEvts();
        let response = await Api.get('tweets');

        this.setState({
            tweets: response.data,
            showClean: localStorage.getItem('@GoTwitter:username') == 'Ababa   '
        });
    }

    subscribeToEvts = () => {
        const io = socket('http://172.30.2.220:3000/');
        //const io = socket('http://127.0.0.1:3000');

        io.on('tweet', (data) => {
            this.setState({
                tweets: [data, ...this.state.tweets]
            })
        });

        io.on('like', (data) => {
            this.setState({
                tweets: this.state.tweets.map(tweet => tweet._id == data._id ? data : tweet)
            })
        });

        io.on('tweetClean', (data) => {
            this.setState({
                tweets: data
            })
        });
    }

    handleInputChange = (e) => {
        this.setState({ newTweet: e.target.value });
    }

    handleClean = async (e) => {
        let response = await Api.put('clean');

        this.setState({ tweets: response.data });

    }

    submitTweet = async (e) => {
        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        if (content.trim() === '')
            return;

        await Api.post('tweets', {
            content: content,
            author: author
        });

        this.setState({ newTweet: '' })
    }

    handleNewTweet = async (e) => {
        if (e.keyCode !== 13) return;

        await this.submitTweet(e);
    }

    onDrop = async (files) => {
        const author = localStorage.getItem('@GoTwitter:username');

        const data = new FormData();

        console.log(files[0]);

        data.append("file", files[0], files[0].name);

        await Api.post('tweets/file?author=' + author, data);

        this.setState({ newTweet: '' });
    }

    render() {
        return (
            <div className="timeline-wrapper">
                {
                    this.state.showClean ? (
                        <MDBBtn color="elegant" style={{ left: '35%', width: '26%' }} onClick={this.handleClean} >
                            <MDBIcon icon="ban" />
                        </MDBBtn>) : null
                }
                <p>Welcome To Borsa Chat</p>
                <MDBIcon fab icon="connectdevelop" size="4x" />

                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está pensando?"
                    />
                    <MDBBtn color="elegant" onClick={this.submitTweet}>Enviar</MDBBtn>
                    <ImageUpload onDrop={this.onDrop}>
                        <MDBBtn color="elegant">
                            <MDBIcon icon="cloud-upload-alt" size="3x" />
                        </MDBBtn>
                    </ImageUpload>

                </form>
                <ul className="tweet-list">
                    {
                        this.state.tweets.map((t) =>
                            (
                                <Tweet key={t._id} tweet={t} />
                            )
                        )
                    }
                </ul>

            </div>
        );
    }
}
