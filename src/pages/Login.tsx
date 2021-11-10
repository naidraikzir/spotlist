import { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function login(e) {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col bg-white w-[400px] shadow-xl p-8 m-4"
        onSubmit={login}
      >
        <label
          htmlFor="username"
          className="block mb-2 font-bold"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="block w-full px-4 py-2 border border-gray-300 mb-4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label
          htmlFor="password"
          className="block mb-2 font-bold"
        >
          Password
        </label>
        <input
          type="text"
          id="password"
          placeholder="password"
          className="block w-full px-4 py-2 border border-gray-300 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-300 font-bold px-8 py-2 mt-4 ml-auto"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
