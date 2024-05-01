import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";




const Register = () => {
    const [registererror, setRegistererror] = useState('');
    const [registersuccess, setregistersuccess] = useState('');
    const [showpassword, setshowpassword] = useState(false);


    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email, password,accepted)

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
        else if (!accepted){
            setRegistererror("please accept our terms and condition ");
            return;
        }


        // create user 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setregistersuccess('user created successfully ')

                // update profile
                updateProfile(result.user ,{
                    displayName :name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() => console.log("profile updated "))
                .catch()

                // send verfication email 
                sendEmailVerification(result.user)
                .then(() =>{
                    alert("please check your email and verify ")
                })
                
            })
            .catch(error => {
                console.error(error);
                setRegistererror(error.message)
            })


    }


    return (
        <div>
            <h3 className="text-3xl mb-4">Please Register </h3>
            <form onSubmit={handleRegister} className="bg-slate-200 " >
                <input className="mb-4 w-full border " type="text" name="name" id="" placeholder="Enter Your Name" required />
                <br />
                <input className="mb-4 w-full border" type="email" name="email" id="" placeholder="Enter Your Email" required />
                <br />
                <div className="relative">
                    <input className="mb-4 w-full border" type={showpassword ? "text" : "password"} name="password" id="" placeholder="Enter Your Password" required />
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




                <br />
                <input className=" btn btn-secondary  mb-4" type="submit" value="Register" />
            </form>
            {
                registererror && <p className="text-red-700" >{registererror}</p>
            }
            {
                registersuccess && <p className="text-green-600" >{registersuccess}</p>
            }
            <p>Already have an account? Pleasee  <Link to="/login">Login </Link></p>
             
        </div>
    );
};

export default Register;