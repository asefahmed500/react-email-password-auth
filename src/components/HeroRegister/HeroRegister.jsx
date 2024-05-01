import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const HeroRegister = () => {


    const [registererror, setRegistererror] = useState('');
    const [registersuccess, setregistersuccess] = useState('');
    const [showpassword, setshowpassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        // reset error and success
        setRegistererror('');
        setregistersuccess('');


        if (password.length < 6) {
            setRegistererror('password must me at least six characters ');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegistererror('Passwaord must  contain atleast one Uppercase character ');
            return;

        }
        else if (!accepted) {
            setRegistererror("please accept our terms and condition ");
            return;
        }



        // create user 

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setregistersuccess('user created successfully ')
            })
            .catch(error => {
                console.error(error);
                setRegistererror(error.message);
            })

    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                            et a id nisi.
                        </p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showpassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <span className="absolute top-2 right-3" onClick={() => setshowpassword(!showpassword)} >
                                    {
                                        showpassword ? <FaEyeSlash> </FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            <br />
                            <div className="mb-4">
                                <input type="checkbox" name="terms" id="terms" />
                                <label htmlFor="terms">Accept our Terms and Conditions</label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        {
                            registererror && <p className="text-red-700" >{registererror}</p>
                        }
                        {
                            registersuccess && <p className="text-green-600" >{registersuccess}</p>
                        }
                        <p>Already have an account? Pleasee  <Link to="/login">Login </Link></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;
