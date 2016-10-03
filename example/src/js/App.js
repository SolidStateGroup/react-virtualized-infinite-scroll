import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import InfiniteScrollExample from './InfiniteScrollExample';

const App = class extends Component {
    displayName: 'App';

    render () {
        return (
            <div style={{margin: 5}}>
                <h2>
                  Async Infinite Scroll
                </h2>
                <InfiniteScrollExample />
                <h2>
                  Async Infinite Reverse Scroll
                </h2>
                <InfiniteScrollExample reverse={true} />
            </div>
        );
    }
};

App.propTypes = {};

module.exports = App;