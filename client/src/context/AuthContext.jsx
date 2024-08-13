/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react'
import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider')

  return context
}

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      const data = await res.json()
      if (res.status !== 200) throw data.error
      setUser(data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error)
    }
  }

  const signin = async (user) => {
    try{
      const res = await loginRequest(user)
      const data = await res.json()
      if (res.status !== 200) throw data.error
      setUser(data)
      setIsAuthenticated(true)
    } catch (error){
      setErrors(error)
    }
  }

  const logout = async () => {
    try {
      const res = await logoutRequest()
      if (res.status !== 200) throw new Error('Fail')
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.error(error)
    }
    
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      },5000)
      return () => {clearTimeout(timer)}
    }
  }, [errors])

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()
      try {
        if(!cookies?.token) throw new Error('No token, authorization denied')

        const res = await verifyTokenRequest()
        const data = await res.json()
        if (res.status !== 200 ) throw data.error
        setUser(data)
        setIsAuthenticated(true)
      } catch (error){
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      logout,
      user,
      isAuthenticated,
      errors,
      loading
    }}>
      { children }
    </AuthContext.Provider>
  )
}
