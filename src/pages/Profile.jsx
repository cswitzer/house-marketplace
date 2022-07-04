import React, { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"

const Profile = () => {
  const [user, setUser] = useState(null)
  const auth = getAuth()

  // check if the current user is logged in
  useEffect(() => {
    setUser(auth.currentUser)
  }, [])

  return user ? <h1>{user.displayName}</h1> : "Not Logged In"
}

export default Profile
