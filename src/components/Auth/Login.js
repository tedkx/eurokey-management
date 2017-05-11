import React from 'react';
import { Redirect } from 'react-router-dom'

import Helper from '../../lib/Helper'

const defaults = {
    user: null,
    authenticating: false
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'tspiouneas',
            password: 'tspiouneas',
            message: ''
        };

        Helper.bind(this, ['onChange', 'handleSubmit', 'getPreviousLocation']);
    }

    componentWillReceiveProps(nextProps, nextState) {
        if(!Helper.isNullOrWhitespace(nextProps.message)) {
            this.setState({
                message: nextProps.message
            });
        }
    }

    getPreviousLocation() {
        return this.props.location.from || { pathname: '/' }
    }

    onChange(input, e) {
        this.setState({
            message: '',
            [input]: this[`_${input}Ref`].value
            //[`${input}Dirty`]: true
        });
    }

    handleSubmit(e) {
        if(e && e.preventDefault)
            e.preventDefault();
        this.props.onPerformLogin(this.state.username, this.state.password);
        return false;
    }

    render() {
        if(this.props.user != null)
            return <Redirect to={ this.getPreviousLocation() } />

        return (
            <div className="login-wrap">
                <div className="m-t-30 card-box">
                    <div className="text-center">
                        <h4 className="text-uppercase font-bold m-b-0">Εισοδος</h4>
                    </div>
                    <div className="panel-body">
                        <form className="form-horizontal m-t-10" onSubmit={ this.handleSubmit }>
                            <div className="form-group ">
                                <div className="col-xs-12">
                                    <input className="form-control" type="text" placeholder="Όνομα Χρήστη"
                                        ref={ (input) => this._usernameRef = input }
                                        autoFocus={ true }
                                        onChange={ (e) => this.onChange('username', e) }
                                        value={ this.state.username }
                                        />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <input className="form-control" type="password" placeholder="Κωδικός"
                                        ref={ (input) => this._passwordRef = input }
                                        onChange={ (e) => this.onChange('password', e) }
                                        value={ this.state.password } 
                                        />
                                </div>
                            </div>

                            {
                                Helper.isNullOrWhitespace(this.state.message)
                                    ? false
                                    : <div className="alert alert-danger">{ this.state.message }</div>
                            }

                            <div className="form-group text-center m-t-30">
                                <div className="col-xs-12">
                                    <button className="btn btn-custom btn-bordred btn-block waves-effect waves-light text-uppercase" 
                                        type="submit">Log In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;