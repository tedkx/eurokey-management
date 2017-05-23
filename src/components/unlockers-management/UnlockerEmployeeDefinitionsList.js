import React    from 'react';
import { Link, Redirect } from 'react-router'

import { history }  from '../../data/Store'
import Helper   from '../../lib/Helper'
import Comparer from '../../lib/Comparer'
import DataGrid from '../grid/DataGrid'
import Card     from '../shared/Card'

const levels = {
    none: '',
    owner: 'Κλειδούχος',
    sub1: 'Αντικαταστάτης Α',
    sub2: 'Αντικαταστάτης Β'
}

class UnlockerEmployeeDefinitionsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { levels: Object.keys(levels) };

        this.columnDefs = [
            { headerName: 'Όνομα', valueGetter: ({ data }) => `${data.lastName} ${data.firstName}` },
            { headerName: 'Ανάθεση', width: 50, cellRendererFramework: ({ data }) => {
                return (
                    <select name="account" className="form-control" onChange={ e => this.onDropdownChange(e, data.id) } defaultValue={ data.assigned }>
                        { 
                            Object.keys(levels).map(k => <option key={ 'key-' + k } value={ k }>{ levels[k] }</option>)
                        }
                    </select>
                );
            }}
        ];

        Helper.bind(this, ['fetch', 'save', 'onDropdownChange', 'onGridReady']);
    }

    onDropdownChange(e, id) {
        // let clone = this.state.data.splice(0),
        //     datum = clone.find(d => d.id == id);
        // if(datum) {
        //     datum.lockAssigned = e.target.checked;
        //     this.setState({ data: clone });
        //     // for(let key of Object.keys(this.api.rowRenderer.renderedRows))
        //     //     if(this.api.rowRenderer.renderedRows[key].rowNode.data.id == id)
        //     //         return this.api.refreshRows([ this.api.rowRenderer.renderedRows[key].rowNode ]);
        // }
    }

    onGridReady(params) {
        this.api = params.api;
    }

    fetch(type, id) {
        setTimeout(() => this.props.fetchData(type, id));
    }

    save(e) {
        alert('Καταχωρήθηκε');
        //this.props.saveData(this.state.data.filter(d => d.lockAssigned != d.originallyAssigned));
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
            return history.push('/unlockers' );

        // new lock requested, no need to rerender, clearData() will do it
        if(this.props.params.id != nextProps.params.id || this.props.params.type != nextProps.params.type) {
            this.props.clearData();
            return this.fetch(nextProps.params.next, nextProps.params.id);
        }
        
        if(Helper.isArray(nextProps.data) && !Comparer.equal(this.props.data, nextProps.data))
            this.setState({ data: nextProps.data.map(d => Object.assign({}, d, { originallyAssigned: d.assigned })) });
    }

    render() {
        if(this.props.saved)
            return false

        let btnDis = (this.props.saving ? 'disabled' : ''),
            headingTemplate = <Link to={ '/unlockers' } className={ `btn btn-raised btn-danger pull-right btn-sm mr-sm ${btnDis}` }>Ακύρωση</Link>;
        return (
            <div className="row">
                <Card title="Ορισμός Κλειδούχων" headingTemplate={ headingTemplate }>
                    <DataGrid onGridReady={ this.onGridReady } columnDefs={ this.columnDefs } noBox={ true } 
                        rowData={ this.state.data } loading={ this.props.fetching }
                        getRowClass={ (params) => params.data.lockAssigned != params.data.originallyAssigned ? 'warning' : '' }>
                    </DataGrid>
                    <div className="row mt">
                        <button className={ `btn btn-raised btn-primary pull-right btn-sm mr-sm ${btnDis}` }
                            type="button" disabled={ this.props.saving } onClick={ this.save }>Αποθήκευση</button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default UnlockerEmployeeDefinitionsList;