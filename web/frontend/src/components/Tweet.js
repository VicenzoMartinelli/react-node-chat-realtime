import React, { Component } from 'react'
import './Tweet.css';
import like from '../like.svg';
import Api from '../services/Api';

export default class Tweet extends Component {
    handleLikeClick = async (e) => {
        let { _id } = this.props.tweet;

        await Api.post(`likes/${_id}`);
    }

    renderBody = () => {
        let { extension, content, type } = this.props.tweet;
        if (type === 'File') {
            return (<img src={`data:${extension};base64,${content}`} />);
        }
        else {
            return (<p>{content}</p>);
        }
    }

    render() {
        const { tweet } = this.props;

        return (
            <li className="tweet">
                <strong>{tweet.author}</strong>
                <div>
                    {this.renderBody()}
                </div>
                <button type="button" onClick={this.handleLikeClick}>
                    <img src={like} alt="Like" />
                    {tweet.likes}
                </button>
            </li>
        );
    }
}
