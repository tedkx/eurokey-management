import React    from 'react';
import { Link, Redirect } from 'react-router'

import { history }  from '../../data/Store'
import Helper   from '../../lib/Helper'
import Comparer from '../../lib/Comparer'
import DataGrid from '../grid/DataGrid'
import Box      from '../shared/Box'

class LocksBranchesAssignmentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { data: null };

        this.columnDefs = [
            { headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Ανατεθειμένο', cellClass: 'checkbox-cell text-center', width: 50, cellRendererFramework: (params) => {
                return (
                    <div className="checkbox c-checkbox md-sm">
                        <label>
                            <input type="checkbox" checked={ params.data.lockAssigned } 
                                onChange={ (e) => this.onCheckboxChange(e, params.data.id) }/>
                            <span className="fa fa-check"></span>
                        </label>
                    </div>
                );
            }}
        ];

        Helper.bind(this, ['fetch', 'save', 'selectAll', 'onCheckboxChange', 'onGridReady']);
    }

    onCheckboxChange(e, id) {
        let clone = this.state.data.splice(0),
            datum = clone.find(d => d.id == id);
        if(datum) {
            datum.lockAssigned = e.target.checked;
            this.setState({ data: clone });
            // for(let key of Object.keys(this.api.rowRenderer.renderedRows))
            //     if(this.api.rowRenderer.renderedRows[key].rowNode.data.id == id)
            //         return this.api.refreshRows([ this.api.rowRenderer.renderedRows[key].rowNode ]);
        }
    }

    onGridReady(params) {
        this.api = params.api;
    }

    fetch(id) {
        setTimeout(() => this.props.fetchData(id));
    }

    save(e) {
        this.props.saveData(this.state.data.filter(d => d.lockAssigned != d.originallyAssigned));
    }

    selectAll(e) {
        this.setState({ data: this.state.data.map(d => Object.assign({}, d, { lockAssigned: true })) });
    }

    /* React component lifecycle methods */

    componentDidMount() {
        this.fetch(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.params.id == nextProps.params.id;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.saved === true)
            return history.push('/locks');

        // new lock requested, no need to rerender, clearData() will do it
        if(this.props.params.id != nextProps.params.id) {
            this.props.clearData();
            return this.fetch(nextProps.params.id);
        }
        
        if(Helper.isArray(nextProps.data) && !Comparer.equal(this.props.data, nextProps.data))
            this.setState({ data: nextProps.data.map(d => Object.assign({}, d, { originallyAssigned: d.lockAssigned })) });
    }

    render() {
        if(this.props.saved)
            return false

        let btnDis = (this.props.saving ? 'disabled' : '');
        return (
            <Box>
                <div className="row mb">
                    <Link to={ '/locks' } className={ `btn btn-raised btn-danger pull-right btn-sm mr-sm ${btnDis}` }>Ακύρωση</Link>
                    <button type="button" className={ `btn btn-raised btn-info pull-right btn-sm mr-sm ${btnDis}` }
                        onClick={ this.selectAll }>Επιλογή Όλων</button>
                    <h4 className="mt0">Ανάθεση θέσης { this.props.params.id }</h4>
                </div>
                <DataGrid onGridReady={ this.onGridReady } columnDefs={ this.columnDefs } noBox={ true } 
                    rowData={ this.state.data } loading={ this.props.fetching }
                    getRowClass={ (params) => params.data.lockAssigned != params.data.originallyAssigned ? 'warning' : '' }>
                </DataGrid>
                <div className="row mt">
                    <button className={ `btn btn-raised btn-primary pull-right btn-sm mr-sm ${btnDis}` }
                        type="button" disabled={ this.props.saving } onClick={ this.save }>Αποθήκευση</button>
                </div>
            </Box>
        );
    }
}

export default LocksBranchesAssignmentsList;