import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Alert from '@mui/material/Alert';
class SignUp extends Component {
    host = 'http://localhost:5000';
    constructor() {
        super();
        this.state = { credentials: { name: "", email: '', password: '', confirm_pass: "" }, errorAlert: null, errAlertVisible: false, successAlert: false ,showPass:{toggle:false,text:'Show Password',Type:'password'},confPass:{toggle:false,text:'Show Password',Type:'password'}};
    }
    toggleShowPassword=()=>{
        if (this.state.showPass.toggle===false){
            this.setState({showPass:{toggle:true,text:'Hide Password',Type:'text'}});
            document.getElementsByName('password').type=this.state.showPass.Type;
        }
        else{
            this.setState({showPass:{toggle:false,text:'Show Password',Type:'password'}});
            document.getElementsByName('password').type=this.state.showPass.Type;
        }
    }
    toggleConfPassword=()=>{
        if (this.state.confPass.toggle===false){
            this.setState({confPass:{toggle:true,text:'Hide Password',Type:'text'}});
            document.getElementsByName('password').type=this.state.confPass.Type;
        }
        else{
            this.setState({confPass:{toggle:false,text:'Show Password',Type:'password'}});
            document.getElementsByName('password').type=this.state.confPass.Type;
        }
    }

    
    handleOnChange = (e) => {
        this.setState({ credentials: { ...this.state.credentials, [e.target.name]: e.target.value } })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.credentials.password !== this.state.credentials.confirm_pass) {
            this.setState({ errorAlert: 'Password does not match', errAlertVisible: true });
        }
        else {
            const response = await fetch(`${this.host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: this.state.credentials.name, email: this.state.credentials.email, password: this.state.credentials.password }),
            });
            const json = await response.json();
            console.log(json);


            if (json.success) {
                localStorage.setItem('token', json.authToken);
                localStorage.setItem('message', json.message);
                this.setState({ successAlert: true });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1520);
            }
            else {
                this.setState({ errorAlert: json.error, errAlertVisible: true });
            }
        }
        setTimeout(() => {
            this.setState({ errAlertVisible: false, successAlert: false });
        }, 1500);
    }
    render() {
        return (
            <>
                {
                    this.state.errAlertVisible && (
                        <>
                            <Alert variant='filled' severity='error' className='-ml-1'>
                                {this.state.errorAlert}
                            </Alert>
                        </>
                    )
                }
                {
                    this.state.successAlert && (
                        <>
                            <Alert variant='filled' severity='success' className='-ml-1'>
                                Sign Up successfull :)
                            </Alert>
                        </>
                    )
                }
                <div id="OuterSignUpBox" className='flex items-center justify-center pb-[0.9rem] bg-gradient-to-tl from-yellow-400 via-fuchsia-300 to-violet-600 flex-col' >
                <h2 className='mt-2 text-xl lg:text-2xl font-bold font-mono'>Create a new iNotebook Account by signing up</h2>
                <br />
                    <div id="SignUpContainer" className='p-4 w-4/6 md:w-6/12 lg:w-5/12 xl:w-1/4 rounded-xl bg-white shadow-lg shadow-neutral-900'>
                        <h2 className='font-bold text-xl text-center'>SIGN UP</h2>
                        <form id="signUpDetails" className='flex flex-col space-y-5 space-x-2' onSubmit={this.handleSubmit}>
                            <p></p>
                            <label htmlFor='name'>Name</label>
                            <input type="text" placeholder='Enter your name' name="name" className='inp-bottom-line focus:bg-[url("https://png.pngtree.com/png-vector/20240104/ourmid/pngtree-name-isolated-tiled-letters-concept-and-theme-label-png-image_10944477.png")] focus:bg-no-repeat focus:bg-left focus:bg-2.35 focus:px-9' onChange={this.handleOnChange} required />
                            <label htmlFor='email'>Email</label>
                            <input type="email" placeholder='Enter your email address' name="email" className='inp-bottom-line focus:bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_TFTl9sS9eMSia2-sv2aeQU8H-qFXgyY4Qw&s")] focus:bg-no-repeat focus:bg-left focus:bg-2 focus:px-9' onChange={this.handleOnChange} required />
                            <label htmlFor='password'>Create Password</label>
                            <input type={this.state.showPass.Type} placeholder='Create New password' name="password" className='inp-bottom-line focus:bg-[url("https://icons.veryicon.com/png/o/miscellaneous/ocp/password-180.png")] focus:bg-no-repeat focus:bg-left focus:bg-1.3 focus:px-7' onChange={this.handleOnChange} minLength={6} required />
                            <div className='space-x-3'>
                                <input type="checkbox" name="showHide" className='w-4 h-4' onClick={this.toggleShowPassword}/>
                                <label htmlFor="showHide" className='font-bold'>{this.state.showPass.text}</label>
                            </div>
                            <label htmlFor='confirm_pass'>Confirm Password</label>
                            <input type={this.state.confPass.Type} placeholder='Please re-enter password' name="confirm_pass" className='inp-bottom-line focus:bg-[url("https://icons.veryicon.com/png/o/commerce-shopping/electricity-supplier-h5/confirm-password.png")] focus:bg-no-repeat focus:bg-left focus:bg-1.55 focus:px-7' onChange={this.handleOnChange} minLength={6} required />
                            <div className='space-x-3 flex items-center'>
                                <input type="checkbox" name="showHide" className='w-4 h-4' onClick={this.toggleConfPassword}/>
                                <label htmlFor="showHide" className='font-bold'>{this.state.confPass.text}</label>
                            </div>
                            <center><button id='SignUpButton' className='text-base px-1.5 py-2 bg-gradient-to-r from-sky-500 to-green-500 hover:from-red-500 hover:to-yellow-500 rounded-3xl md:px-2 md:py-2.5 text-gray-100 md:text-lg w-10/12 lg:text-xl'>Sign Up</button></center>
                            {/* <p className='text-center opacity-60 '>Already Have an Account?</p>
                                <center><button id='LoginButton' className='text-base px-1.5 py-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 hover:from-emerald-400 hover:via-lime-400 hover:to-lime-600 hover:text-black rounded-3xl md:px-2 md:py-2.5 text-gray-100 md:text-lg w-10/12 lg:text-xl'>Login</button></center> */}
                            <p></p>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(SignUp);