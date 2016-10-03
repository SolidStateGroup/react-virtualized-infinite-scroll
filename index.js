import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import 'react-virtualized/styles.css';
import { AutoSizer, InfiniteLoader, VirtualScroll } from 'react-virtualized';

class InfiniteScroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollToBottom: true
    };
    this.scrollHeight = 0;
  }

  loadMore = () => {
    if (!this.props.isLoading) {
      this.props.loadMore();
    }
  }

  isRowLoaded = ({ index }) => (
      (this.props.reverse ? this.props.data.length - 1 - index : index) < this.props.data.length - this.props.threshold
  )

  onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (!this.props.reverse) {
      return;
    }

    // Keep track of scroll height
    this.scrollHeight = scrollHeight;

    // Check whether initial scroll to bottom in reverse mode has completed
    if (this.state.scrollToBottom && scrollTop === scrollHeight - clientHeight) {
      this.setState({ scrollToBottom: false });
    }
  }

  adjustScrollPos = (adj) => {
    const virtualScroll = ReactDOM.findDOMNode(this.virtualScroll);
    if (virtualScroll.scrollTop !== virtualScroll.scrollHeight - virtualScroll.clientHeight) {
      virtualScroll.scrollTop += adj;
    }
  }

  componentWillReceiveProps(newProps) {
    // Scroll to bottom on initial data in reverse mode only
    if (this.props.reverse &&
        (!this.props.data || this.props.data.length === 0) &&
        newProps.data && newProps.data.length) {
      this.setState({ scrollToBottom: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.reverse) {
      return;
    }

    // Re-measure all estimated rows if data has changed or loading is displayed
    if (prevProps.data && this.props.data &&
        (prevProps.data.length !== this.props.data.length ||
        prevProps.isLoading !== this.props.isLoading)) {
      this.virtualScroll.measureAllRows();
    }

    // Get total size directly from the grid (which is updated by measureAllRows())
    const totalSize = this.virtualScroll.Grid._rowSizeAndPositionManager.getTotalSize();

    // Get the DOM node for the virtual scroll
    const virtualScroll = ReactDOM.findDOMNode(this.virtualScroll);

    // With a valid scroll height and as long as we do not need to scroll to bottom
    if (virtualScroll && totalSize && !prevState.scrollToBottom) {
      // If the scroll height has changed, adjust the scroll position accordingly
      if (this.scrollHeight !== totalSize) {
        virtualScroll.scrollTop += totalSize - this.scrollHeight;
        this.scrollHeight = totalSize;
      }
    }
  }

  rowRenderer = ({ index }) => {
    if (this.props.reverse) {
      // Data needs to be rendered in reverse order, check for loading
      if (this.props.isLoading) {
        // Data is shifted down by 1 while loading
        if (index >= 1 && index < this.props.data.length + 1) {
          return this.props.renderRow(this.props.data[this.props.data.length - index]);
        }

        return this.props.renderLoading;
      }

      return this.props.renderRow(this.props.data[this.props.data.length - 1 - index]);
    }

    if (index < this.props.data.length) {
      return this.props.renderRow(this.props.data[index]);
    }

    return this.props.renderLoading;
  }

  render () {
    const { isLoading, data, containerHeight, rowHeight, scrollToRow, reverse, scrollRef } = this.props;
    const rowCount = isLoading ? data.length + 1 : data.length;

    return (
        <AutoSizer disableHeight={this.props.containerHeight ? true : false}>
          {({ height, width }) => (
              <InfiniteLoader
                  rowCount={rowCount}
                  isRowLoaded={this.isRowLoaded}
                  loadMoreRows={this.loadMore}
              >
                {({ onRowsRendered, registerChild }) => (
                    <VirtualScroll
                        overscanRowCount={20}
                        rowCount={rowCount}
                        width={width}
                        scrollToIndex={reverse ? rowCount - 1 - (this.state.scrollToBottom ? 0 : scrollToRow) : scrollToRow}
                        height={containerHeight || height}
                        rowHeight={rowHeight}
                        ref={(virtualScroll) => {
                          this.virtualScroll = virtualScroll;
                          scrollRef && scrollRef(virtualScroll);
                          registerChild(virtualScroll);
                        }}
                        onRowsRendered={onRowsRendered}
                        rowRenderer={this.rowRenderer}
                        onScroll={this.onScroll}
                    />
                )}
              </InfiniteLoader>
          )}
        </AutoSizer>
    );
  }
};

InfiniteScroll.propTypes = {
  loadMore: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  threshold: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  scrollToRow: PropTypes.number,
  renderLoading: PropTypes.object,
  data: PropTypes.array,
  containerHeight: PropTypes.number,
  reverse: PropTypes.bool,
  scrollRef: PropTypes.func,
};

InfiniteScroll.defaultProps = {
  isLoading: false,
  renderLoading: (
    <div style={{ height: 40 }}>
      Loading...
    </div>
  ),
  reverse: false
}

module.exports = InfiniteScroll;
