import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, isAuthenticated, errors:LoginErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])

  const onSubmit = handleSubmit(signin)

  return (
    <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>

        {
          LoginErrors?.length > 0  && LoginErrors.map((err, i) => (
            <div className='bg-red-500 p-2 my-1 text-white' key={ i }>{ err }</div>)
          )
        }

        <h1 className='text-2xl font-bold mb-5'>Login</h1>

        <form className='w-96 mb-5' onSubmit = { onSubmit } >
          <input type="email" placeholder='test@test.com' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            {...register('email', { required: true })} />
          {
            errors.email && <p className='text-red-500'>Email is required</p>
          }
          <input type="password" placeholder='abc123' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            {...register('password', { required: true })} />
          {
            errors.password && <p className='text-red-500'>Password is required</p>
          }
          <button type='submit' className='py-2 px-4 border rounded-lg mt-3'>
            Login
          </button>
        </form>

        <p className='flex gap-x-2 justify-between'>
          Don&#39;t have an account? 
          <Link to='/register' className='text-sky-500'>Sign up</Link>
        </p>

      </div>
    </div>
  )
}
