import React, {Component} from 'react';

export default class Item extends Component {
    vote(item) {
        if (!Meteor.userId()) {
            return console.log('need to be logged in');
        }

        Meteor.call('voteOnItem', this.props.item, item);
    }

    render() {
        return (
            <div className='item'>
                <div className='vote-one' onClick={this.vote.bind(this, 'itemOne')}>
                    <span>{this.props.item.itemOne.value}</span>
                    <h3>{this.props.item.itemOne.text}</h3>
                </div>

                <span>vs</span>

                <div className='vote-two' onClick={this.vote.bind(this, 'itemTwo')}>
                    <span>{this.props.item.itemTwo.value}</span>
                    <h3>{this.props.item.itemTwo.text}</h3>
                </div>
            </div>
        );
    }
}