import React, { Component } from 'react' ;

import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {

        state = {
            error: null
        }

        UNSAFE_componentWillMount(){
           this.requsetInterceptor = axios.interceptors.request.use(req => req , error  => {
                this.setState({error : null});
            })
            this.responseInterceptor = axios.interceptors.response.use( res => res ,error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requsetInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

       clearError = () => {
           this.setState({error : null});
       }
        
        render(){
            return(
                <React.Fragment>
                    <Modal 
                        purchased={this.state.error}
                        cancelPurchasingHangler={this.clearError}>
                        {this.state.error ? this.state.error.message : null}
                        
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler;