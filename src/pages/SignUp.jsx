import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    // '()' around '{}' to return an object
    // update state based on id of input field
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, // e.target.id is email or password
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // auth refers to a row in the firebase authentication table
    // by tying the auth object to an email and password, we can
    // always get the current user with auth.currentUser
    try {
      const auth = getAuth()

      // creates user in firebase auth table and signs them in
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // store the user data in the db in the collection "users"
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy)

      navigate("/")
    } catch (error) {
      toast("Something went wrong with registration")
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />

          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? "text" : "password"}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon
                fill='#ffffff'
                width='34px'
                height='34px'
                className='arrow-right-icon'
              />
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to='/sign-in' className='registerLink'>
          Have an Account? Sign In
        </Link>
      </div>
    </>
  )
}

export default SignUp
