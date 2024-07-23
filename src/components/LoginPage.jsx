import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Alert from '@mui/material/Alert';
class LoginPage extends Component {
    host = 'http://localhost:5000';
    constructor() {
        super();
        this.state = { credentials: { email: '', password: '' }, errorAlert: null, errAlertVisible: false, successAlert: false,showPass:{toggle:false,text:'Show Password',Type:'password'}};
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

    handleOnChange = (e) => {
        this.setState({ credentials: { ...this.state.credentials, [e.target.name]: e.target.value } })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${this.host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.credentials),
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('message', json.message);
            this.setState({ successAlert: true});
            setTimeout(() => {        
                this.props.history.push('/');
            }, 1520);
        }
        else {
            this.setState({ errorAlert: json.error, errAlertVisible: true });
        }
    }catch(err){
        console.log(err);
    }
        setTimeout(() => {
            this.setState({ successAlert: false,errAlertVisible:false});
        }, 1500);
    }

    render() {
        return (
            <>
                {
                    this.state.errAlertVisible &&(
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
                                Logged in successfully :)
                            </Alert>
                        </>
                    )
                }
                <div id="OuterLoginBox" className='flex items-center justify-center py-[7.7rem] bg-gradient-to-tl from-yellow-400 via-fuchsia-300 to-violet-600 flex-col'>
                <h2 className='text-xl lg:text-2xl font-bold mb-5 font-mono'>Login to your iNotebook account</h2>        
                    <div id="LoginContainer" className='p-4 w-4/6 md:w-6/12 lg:w-5/12 xl:w-1/4 rounded-xl bg-white shadow-lg shadow-neutral-900'>
                        <h2 className='font-bold text-xl text-center'>LOGIN</h2>
                        <form id="loginDetails" className='flex flex-col space-y-6 space-x-2' onSubmit={this.handleSubmit}>
                            <p></p>
                            <label htmlFor='email'>Email</label>
                            <input type="email" placeholder='Enter your email address' className='inp-bottom-line focus:bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_TFTl9sS9eMSia2-sv2aeQU8H-qFXgyY4Qw&s")] focus:bg-no-repeat focus:bg-left focus:bg-2 focus:px-9' name='email' value={this.state.credentials.email} onChange={this.handleOnChange} />
                            <label htmlFor='password'>Password</label>
                            <input type={this.state.showPass.Type} placeholder='Enter password' className='inp-bottom-line focus:bg-[url("https://icons.veryicon.com/png/o/miscellaneous/ocp/password-180.png")] focus:bg-no-repeat focus:bg-left focus:bg-1.3 focus:px-7' name='password' value={this.state.credentials.password} onChange={this.handleOnChange} />
                            <div className='space-x-3'>
                                <input type="checkbox" name="showHide" className='w-4 h-4' onClick={this.toggleShowPassword}/>
                                <label htmlFor="showHide" className='font-bold'>{this.state.showPass.text}</label>
                            </div>
                            {/* <span className='inline-flex justify-end'><Link to='/' className='hover:underline hover:text-blue-500'>Forgot Password?</Link></span> */}
                            <center><button id='LoginButton' className='text-base px-1.5 py-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 hover:from-emerald-400 hover:via-lime-400 hover:to-lime-600 hover:text-black rounded-3xl md:px-2 md:py-2.5 text-gray-100 md:text-lg w-10/12 lg:text-xl'>Login</button></center>
                            {/* <p className='text-center opacity-60 '>Or Sign Up Using</p>
                            <center><button id='SignUpButton' className='text-base px-1.5 py-2 bg-gradient-to-r from-sky-500 to-green-500 hover:from-red-500 hover:to-yellow-500 rounded-3xl md:px-2 md:py-2.5 text-gray-100 md:text-lg w-10/12 lg:text-xl'><Link to='/signup'>Sign Up</Link></button></center>
                            <p></p> */}
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(LoginPage);
