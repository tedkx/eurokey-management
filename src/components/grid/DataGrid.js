import React            from 'react'
import ReactDOM         from 'react-dom'
import { AgGridReact }  from 'ag-grid-react'

import LoaderOverlay    from '../layout/LoaderOverlay'
import Helper           from '../../lib/Helper'
import UiHelper         from '../../lib/UiHelper'

const footerHeight = 20;
const defaultRowHeight = 35;

const HeightModes = {
    Fixed: 1, // height is supplied
    Full: 2, // height based on window height, will change on resize
    Auto: 3 // based on grid rows
}

class DataGrid extends React.Component {
    constructor(props) {
        super(props);

        this._gridProps = Object.assign({}, props);
        delete this._gridProps['onGridReady'];
        delete this._gridProps['gridSizeChanged'];
        if(typeof this._gridProps.rowHeight !== 'number')
            this._gridProps.rowHeight = defaultRowHeight;

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
        this._gridApi = params.api;

        if(typeof this.props.onGridReady === 'function')
            this.props.onGridReady(params);
        
        if(this._mode === HeightModes.Auto)
            this.setAutoHeight();
        else
            this.updateDimensions();

        //setTimeout(() => params.api.sizeColumnsToFit());
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

        this.setState({ initialized: true });
    }

    componentWillReceiveProps(nextProps) {
        let differentData = !Helper.isArray(this.props.rowData) && Helper.isArray(nextProps.rowData) ||
            this.props.rowData.length != nextProps.rowData.length;

        if (differentData) {
            this._gridProps.rowData = nextProps.rowData;
            this.setState({ wrapHeightSet: false });
            setTimeout(this.setAutoHeight);
        }
    }

    componentWillUnmount() {
        if(this._mode === HeightModes.Full)
            window.removeEventListener("resize", this.updateDimensions);
    }
    
    render() {
        let classNames = 'card-box ag-blue ag-euro no-cell-focus container-fluid ' + (this.state.initialized ? 'initialized' : '');
        return (
            <div style={ { height: this.state.height } } ref={ (elem) => this._wrap = elem }
                className={ classNames }>
                <LoaderOverlay loading={ this.props.loading } />
                <AgGridReact { ...this._gridProps } onGridReady={ this.onGridReady.bind(this) }
                    onGridSizeChanged={ this.onGridSizeChanged.bind(this) }
                    />
            </div>
        );
    }
}

export default DataGrid