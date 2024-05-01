import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [registererror, setRegistererror] = useState('');
    const [registersuccess, setregistersuccess] = useState('');
    const emailRef = useRef(null);

    const handlelogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setRegistererror('');
        setregistersuccess('');

        // add validation

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setregistersuccess('user logged in  successfully ')
                }
                else{
                    alert("please verify your email address ")
                }
            })
            .catch(error => {
                console.error(error);
                setRegistererror(error.message);
            })


    }

    const handleforgotpassword = () => {

        const email = emailRef.current.value;
        if (!email) {
            console.log("please provide an email", emailRef.current.value);
            return;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log("please write a valid email");
            return;
        }


        // validation 

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email');
            })
            .catch(error => {
                console.log(error)
            })

    }



    return (

        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handlelogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="email"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleforgotpassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        registererror && <p className="text-red-700" >{registererror}</p>
                    }
                    {
                        registersuccess && <p className="text-green-600" >{registersuccess}</p>
                    }
                    <p>New to this website ? Please <Link to="/heroregister">Register</Link> </p>
                </div>
            </div>
        </div>
    );


};

export default Login;