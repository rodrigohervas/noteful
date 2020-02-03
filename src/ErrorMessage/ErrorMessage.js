import React, {Component} from 'react';

class ErrorMessage extends Component {

    render() {
        
        const {message} = this.props;
        if(message) {
            return <div className="error"> {message} </div>
        }

        return (
            <></>
        )
    }

}

export default ErrorMessage;