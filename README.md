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

renderRow (row) {
    return (
        <div className=".FlexTable__row" key={row.key}>
            Row {row.key + 1}
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

### Prop Types
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| loadMore | Function | ✓ | Callback used for loading more data |
| renderRow | Function | ✓ | Used to render each row |
| rowHeight | Number or Function | ✓ | Either a fixed row height (number) or a function that returns the height of a row given its index: `({ index: number }): number` |
| threshold | Number | ✓ | How many rows before the bottom (or top in reverse mode) to request more data |
| isLoading | Bool |  | While true a loading item is shown at the bottom (or top in reverse mode). Useful while loading more data |
| scrollToRow | Number |  | Row index to ensure visible (by forcefully scrolling if necessary) |
| renderLoading | Object |  | Render a custom loading item |
| data | Array |  | Data array |
| containerHeight | Number |  | Force a height on the entire list component. Default is to auto fill available space |
| reverse | Bool |  | Reverse scroll direction. Defaults to `false` |
| scrollRef | Function |  | Callback used to give back reference to underlying virtual scroll component for finer control |

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

# Getting Help
If you encounter a bug or feature request we would like to hear about it. Before you submit an issue please search existing issues in order to prevent duplicates. 

# Contributing
For more information about contributing PRs, please see our <a href="CONTRIBUTING.md">Contribution Guidelines</a>.


# Get in touch
If you have any questions about our projects you can email <a href="mailto:projects@solidstategroup.com">projects@solidstategroup.com</a>.
