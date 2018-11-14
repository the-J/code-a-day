import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {autobind} from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Item from '/imports/client/components/Item';
import Items from '/imports/api/items';

import IsRole from '/imports/client/utilities/IsRole';

@autobind
class App extends Component {
    addItems(event) {
        event.preventDefault();

        if (!Meteor.userId()) {
            return;
        }

        const itemOne = this.refs.itemOne && this.refs.itemOne.value.trim() ? this.refs.itemOne.value.trim() : undefined;
        const itemTwo = this.refs.itemTwo && this.refs.itemTwo.value.trim() ? this.refs.itemTwo.value.trim() : undefined;

        if (!!itemOne && !!itemTwo) {
            Meteor.call('insertItem', itemOne, itemTwo, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    this.refs.itemOne.value = '';
                    this.refs.itemTwo.value = '';
                }
            });
        }
    }

    showAll() {
        if (this.props.showAll) {
            Session.set('showAll', false);
        }
        else {
            Session.set('showAll', true);
        }
    }

    render() {
        if (!this.props.ready) {
            return <div>Loading data...</div>;
        }

        const items = this.props.items;

        return (
            <main>
                <IsRole role='admin' {...this.props}>
                    <button onClick={this.showAll}>
                        Show {this.props.showAll ? 'One' : 'All'}
                    </button>
                </IsRole>

                <form className='new-items' onSubmit={this.addItems}>
                    <input type='text' ref='itemOne'/>
                    <input type='text' ref='itemTwo'/>
                    <button type='submit'>Add items</button>
                </form>

                <ReactCSSTransitionGroup
                    transitionName='item'
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={600}
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                >
                    {items.map(item =>
                        <Item key={item._id} item={item}/>)
                    }
                </ReactCSSTransitionGroup>
            </main>
        );
    }
}

export default AppContainer = withTracker(({params}) => {
    const subItems = Meteor.subscribe('items');
    const users = Meteor.subscribe('currentUser');
    const showAll = Session.get('showAll');

    let items = [];
    if (params.id) {
        items = Items.find({_id: params.id}).fetch();
    }
    else {
        items = Items.find({}, {limit: showAll ? 50 : 1}).fetch();
    }

    return {
        showAll,
        items,
        ready: subItems.ready() && users.ready()
    };
})(App);