import React from 'react';
// import Button from '@material-ui/core/Button';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Homepage.css';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.changeSelection.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
    }

    state = {
        selected: '1',
        tabData: [{
            label: 'Log In',
            value: '1'
        },{
            label: 'Sign Up',
            value: '2'
        }],
        showErrorContainer: false,
        lengthError: true,
        upperCaseError: true,
        lowerCaseError: true,
        numericError: true
    }

    changeSelection(val){
        this.setState({
            selected: val
        });
    }

    passwordValidation(evt){
        if(evt.target.value.length > 0){
            if(evt.target.value.length >= 1 && evt.target.value.length <= 7){
                this.setState({
                    lengthError: true,
                    showErrorContainer: true
                });
            }else if(evt.target.value.length >= 8){
                this.setState({
                    showErrorContainer: true,
                    lengthError: false
                });
            }

            if(/[A-Z]/g.test(evt.target.value)){
                this.setState({
                    upperCaseError: false
                });
            }else{
                this.setState({
                    upperCaseError: true
                });
            }

            if(/[a-z]/g.test(evt.target.value)){
                this.setState({
                    lowerCaseError: false
                });
            }else{
                this.setState({
                    lowerCaseError: true
                });
            }

            if(/\d/.test(evt.target.value)){
                this.setState({
                    numericError: false
                });
            }else{
                this.setState({
                    numericError: true
                });
            }

            if(!this.state.lengthError && !this.state.lowerCaseError && !this.state.upperCaseError && !this.state.numericError){
                this.setState({
                    showErrorContainer: false
                });
            }else if(this.state.lengthError || this.state.lowerCaseError || this.state.upperCaseError || this.state.numericError){
                this.setState({
                    showErrorContainer: true
                });
            }
        }else{
            this.setState({
                showErrorContainer: false
            });
        }
    }

    render(){
        // return <div>
        //     <Button variant="contained" color="primary">Hello</Button>
        //     <AppBar position="static">
        //         <Toolbar>
        //             <Typography variant="title" color="inherit">
        //             LearnGram
        //             </Typography>
        //         </Toolbar>
        //     </AppBar>
        // </div>
        return <div className='body'>
            <div className='form-container'>
                <div className='form-header'>
                    <p>LearnGram</p>
                </div>
                <div className='form-body'>
                    <Paper square>
                        <Tabs variant="fullWidth" indicatorColor="#ffffff" textColor="primary" centered value={this.state.selected}>
                            {this.state.tabData.map(tab => 
                                <Tab 
                                    className={this.state.selected === tab.value ? 'tab-background-selected' : 'tab-background-unselected'}
                                    label={
                                        <span className={this.state.selected === tab.value ? 'tab-label-selected' : 'tab-unselected'}>
                                            {tab.label}
                                        </span>
                                    } 
                                    value={tab.value} 
                                    key={tab.value} 
                                    onClick={(e) => this.changeSelection(tab.value)}>
                                </Tab>
                            )}
                        </Tabs>
                        <div className='login-form'>
                            <div className='login-form-container'>
                                <div className='login-field'>
                                    <p>Email</p>
                                    <input type="text"></input>
                                </div>
                                <div className='login-field'>
                                    <p>Password</p>
                                    <input className='login-password login-field-last-input' type="password" onKeyUp={this.passwordValidation}></input>
                                </div>
                                <div className={'password-validation ' + (this.state.showErrorContainer ? 'show' : 'hide')}>
                                    <div className='validation-container'>
                                        <div className='validation-content'>
                                            <div className={'validation-icon ' + (this.state.lengthError ? 'hide' : 'show-icon')} >
                                                <img src={require("../../assets/tick.svg")} alt='tick'></img>
                                            </div>
                                            <div className={'validation-icon ' + (this.state.lengthError ? 'show-icon' : 'hide')}>
                                                <img src={require("../../assets/close.svg")} alt='close'></img>
                                            </div>
                                            <div className='validation-text'>
                                                <p>Password should be min 8 chars</p>
                                            </div>
                                        </div>
                                        <div className='validation-content'>
                                        <div className={'validation-icon ' + (this.state.upperCaseError ? 'hide' : 'show-icon')}>
                                                <img src={require("../../assets/tick.svg")} alt='tick'></img>
                                            </div>
                                            <div className={'validation-icon ' + (this.state.upperCaseError ? 'show-icon' : 'hide')}>
                                                <img src={require("../../assets/close.svg")} alt='close'></img>
                                            </div>
                                            <div className='validation-text'>
                                                <p>At least 1 uppercase letter [A-Z]</p>
                                            </div>
                                        </div>
                                        <div className='validation-content'>
                                            <div className={'validation-icon ' + (this.state.lowerCaseError ? 'hide' : 'show-icon')}>
                                                <img src={require("../../assets/tick.svg")} alt='tick'></img>
                                            </div>
                                            <div className={'validation-icon ' + (this.state.lowerCaseError ? 'show-icon' : 'hide')}>
                                                <img src={require("../../assets/close.svg")} alt='close'></img>
                                            </div>
                                            <div className='validation-text'>
                                                <p>At least 1 lowercase letter [a-z]</p>
                                            </div>
                                        </div>
                                        <div className='validation-content'>
                                            <div className={'validation-icon ' + (this.state.numericError ? 'hide' : 'show-icon')}>
                                                <img src={require("../../assets/tick.svg")} alt='tick'></img>
                                            </div>
                                            <div className={'validation-icon ' + (this.state.numericError ? 'show-icon' : 'hide')}>
                                                <img src={require("../../assets/close.svg")} alt='close'></img>
                                            </div>
                                            <div className='validation-text'>
                                                <p>At least 1 numeric char [0-9]</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'form-button-container ' + (this.state.showErrorContainer ? 'hide' : 'show') }>
                                    {this.state.selected === '1' ? <button className='form-button'>
                                            LOGIN
                                        </button> : <button className='form-button'>
                                            SIGN UP
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    }
}



export default HomePage;