# React Virtualized Infinite Scroll Component

A React component that provides you with an infinite scrolling list that be used in either direction.

## Install
```
$ npm install react-virtualized-infinite-scroll --save
```

## Usage

```
import InfiniteScroll from 'react-virtualized-infinite-scroll';

...

loadMore = () => {
    // Set state to loading data
    this.setState({
        isLoading: true,
    });

    // @TODO Perform asychronous load of data
}

// Optional function to return dynamic row height
rowHeight = ({ index }) => {
    return index < this.state.data.length ? this.state.data[index].height : 40;
}

// Example function for adding data to the bottom of the list in reverse mode
addToBottom = () => {
    let data = this.state.data.slice(0);
    data.unshift({ key: data.length, height: this.getRandomHeight() });
    this.setState({ data });
    if (this.infiniteScroll) {
      this.infiniteScroll.adjustScrollPos(this.state.randomRowHeights ? data.height * -1 : -40);
    }
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
                loadMore={this.loadMore}
                renderRow={this.renderRow}
                rowHeight={this.rowHeight}
                threshold={50}
                data={this.state.data}
                isLoading={this.state.isLoading}
                renderLoading={(
                    <div style={{ height: 40 }}>
                        Loading...
                    </div>
                )}
                containerHeight={200}
                ref={(infiniteScroll) => this.infiniteScroll = infiniteScroll}
                scrollRef={(virtualScroll) => this.virtualScroll = virtualScroll}
                reverse={this.props.reverse}
            />
        </div>
    );
}

```

## Development
Should you wish to develop this module further start by cloning this repository

### Run Dev - Run hot reloading node server
```
$ npm start
```

### Run Prod - Build, deploy, minify npm module
```
$ npm run prod
```

### Testing the module
See ```InfiniteScrollExample.js```, this component imports your developed module, if you wish to point to production then uncomment the other import line for InfiniteScroll