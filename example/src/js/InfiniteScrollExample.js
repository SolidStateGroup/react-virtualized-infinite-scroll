import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
//import InfiniteScroll from '../../../';
const range = require('lodash.range');
import InfiniteScroll from '../../../dist/';

class InfiniteScrollExample extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: range(0, 100).map((num) => ({ key: num, height: this.getRandomHeight() })),
            randomRowHeights: false,
        };
    }

    getRandomHeight () {
        return Math.round(Math.random() * 60 + 40);
    }

    loadMore = () => {
        this.setState({
            isLoading: true,
        });
        setTimeout(() => {
            const length = this.state.data.length;
            this.setState({
                isLoading: false,
                data: this.state.data.concat(range(length, length + 100)
                        .map((num) => ({ key: num, height: this.getRandomHeight() })))
            });
        }, 2000);
    }

    addToBottom = () => {
        let data = this.state.data.slice(0);
        data.unshift({ key: data.length, height: this.getRandomHeight() });
        this.setState({ data });
        if (this.infiniteScroll) {
          this.infiniteScroll.adjustScrollPos(this.state.randomRowHeights ? data.height * -1 : -40);
        }
    }

    rowHeight = ({ index }) => {
        if (!this.state.randomRowHeights) {
            return 40;
        }
        return index < this.state.data.length ? this.state.data[index].height : 40;
    }

    onRandomRowHeightsChanged = (randomRowHeights) => {
        this.setState({ randomRowHeights });
        this.virtualScroll.recomputeRowHeights();
    }

    renderRow (data) {
        return (
            <div className=".FlexTable__row" key={data.key}>
                Row {data.key + 1}
            </div>
        );
    }

    render () {
        return (
            <div>
                <InfiniteScroll
                    renderLoading={(
                        <div style={{ height: 40 }}>
                            Loading...
                        </div>
                    )}
                    rowHeight={this.rowHeight}
                    containerHeight={200}
                    threshold={50}
                    data={this.state.data}
                    isLoading={this.state.isLoading}
                    loadMore={this.loadMore}
                    renderRow={this.renderRow}
                    ref={(infiniteScroll) => this.infiniteScroll = infiniteScroll}
                    scrollRef={(virtualScroll) => this.virtualScroll = virtualScroll}
                    reverse={this.props.reverse}
                />
                <div style={{marginTop: 5, marginBottom: 5}}>
                  Use random row heights ?
                  <input type='checkbox' style={{marginLeft: 5}} value={this.state.randomRowHeights} onChange={this.onRandomRowHeightsChanged}/>
                </div>
                {this.props.reverse && <div><button style={{margin: 5}} onClick={this.addToBottom}>Add Row to Bottom</button></div>}
            </div>
        );
    }
};

InfiniteScrollExample.propTypes = {
  reverse: PropTypes.bool
}

InfiniteScrollExample.defaultProps = {
  reverse: false
}

export default InfiniteScrollExample;
