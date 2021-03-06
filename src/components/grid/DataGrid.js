import React            from 'react'
import ReactDOM         from 'react-dom'
import { AgGridReact }  from 'ag-grid-react'

import LoaderOverlay    from '../shared/LoaderOverlay'
import Helper           from '../../lib/Helper'
import Comparer         from '../../lib/Comparer'
import UiHelper         from '../../lib/UiHelper'

const footerHeight = 20;
const defaultRowHeight = 35;

const HeightModes = {
    Fixed: 1, // height is supplied
    Full: 2, // height based on window height, will change on resize
    Auto: 3 // based on grid rows
}

const defaultGridProps = {
    animateRows: true,
    enableSorting: true,
    suppressMovableColumns: true,
    rowHeight: defaultRowHeight
}

class DataGrid extends React.Component {
    constructor(props) {
        super(props);

        let { onGridReady, gridSizeChanged, ...gridProps } = Object.assign({}, defaultGridProps, props);
        if(typeof gridProps.rowHeight !== 'number')
            gridProps.rowHeight = defaultRowHeight;
        this._gridProps = gridProps;

        this.rowHeightClass = gridProps.rowHeight > 48 ? 'ag-row-height-50'
            : gridProps.rowHeight > 43 ? 'ag-row-height-45'
            : gridProps.rowHeight > 38 ? 'ag-row-height-40'
            : ''

        this.state = { 
            height: this.props.height,
            wrapHeightSet: false,
            initialized: false
        };
        this._mode = props.height === 'full' ? HeightModes.Full
            : Helper.isNullOrWhitespace(this.props.height) || this.props.height === 'auto' ? HeightModes.Auto
            : HeightModes.Fixed;

        Helper.bind(this, ['onGridReady','onGridSizeChanged','updateDimensions','setAutoHeight', 'persistElem']);
    } 

    onGridReady(params) {
        this._gridApi = window.api = params.api;

        if(typeof this.props.onGridReady === 'function')
            this.props.onGridReady(params);
        
        if(this._mode === HeightModes.Auto)
            this.setAutoHeight();
        else
            this.updateDimensions();
    }

    onGridSizeChanged() {
        if(typeof this.props.onGridSizeChanged === 'function')
            this.props.onGridSizeChanged();
        if(this._gridApi)
            this._gridApi.sizeColumnsToFit();
    }

    setAutoHeight() {
        if(this._mode !== HeightModes.Auto)
            return;
        if(!this._wrap)
            return;
        if(this.state.wrapHeightSet)
            return;

        let gridViewport = this._wrap.querySelector('.ag-body-viewport'),
            headerStyle = getComputedStyle(this._wrap.querySelector('.ag-header')),
            headerHeight = (parseInt(headerStyle["height"]) || 0) + 
                (parseInt(headerStyle["margin-top"]) || 0) + 
                (parseInt(headerStyle["margin-bottom"]) || 0),
            scrollbarsVisible = gridViewport.clientHeight != gridViewport.scrollheight,
            bodyHeight = typeof maxVisibleRows === 'number' && maxVisibleRows > 0 && this._gridApi.rowModel.rowsToDisplay.length > maxVisibleRows
                ? rowHeight * maxVisibleRows
                : gridViewport.querySelector('.ag-body-container').scrollHeight,
            fix = 5;

        this.setState({ 
            height: (headerHeight + bodyHeight + fix) + 'px',
            wrapHeightSet: true
        });
    }

    updateDimensions() {
        if(this._mode !== HeightModes.Full)
            return;
        let height = window.innerHeight - UiHelper.getOffset(this._wrap).y - footerHeight;
        this.setState({ height: height + 'px' });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        if(this._mode === HeightModes.Full)
            window.addEventListener("resize", this.updateDimensions);
        else if (this._mode === HeightModes.Auto)
            this.setAutoHeight();
    }

    componentWillReceiveProps(nextProps) {
        if(!Comparer.equal(this.props.rowData, nextProps.rowData)) {
            this._gridProps.rowData = nextProps.rowData;
            this.setState({ wrapHeightSet: false });
            this._gridApi.refreshView();
            setTimeout(this.setAutoHeight);
        }
    }

    componentWillUnmount() {
        if(this._mode === HeightModes.Full)
            window.removeEventListener("resize", this.updateDimensions);
    }
    
    render() {
        let selectable = this.props.selectable === true ? '' : 'no-cell-focus',
            autoSize = this._mode == HeightModes.Auto ? 'grid-auto-size' : '',
            className = this.props.className || '';
        return (
            <div style={ { height: this.state.height } } ref={ (elem) => this._wrap = elem }
                className={ `ag-euro ${selectable} ${this.rowHeightClass} ${className} ${autoSize}` }>
                <LoaderOverlay loading={ this.props.loading } />
                <AgGridReact { ...this._gridProps } onGridReady={ this.onGridReady.bind(this) }
                    onGridSizeChanged={ this.onGridSizeChanged.bind(this) }
                    />
                { this.props.children }
            </div>
        );
    }
}

export default DataGrid