import React, { Component } from 'react';

import Card from '../shared/Card'

class LockDetail extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-12">
                    <Card title={ 'Θέση Κλειδώματος' } />
                </div>
            </div>
        );
    }
}

export default LockDetail;