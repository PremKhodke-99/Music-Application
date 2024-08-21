import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { jwtDecode } from "jwt-decode";

const Signin = () => {

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  })
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/user/login', userDetails);
    const data = await response.data;
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.token));
      setUser(jwtDecode(data.token))
      navigate('/library')
    } else {
      alert(data.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  }


  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login form
          </h2>
        </div>

        <div className="my-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={'/signup'} className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Signin