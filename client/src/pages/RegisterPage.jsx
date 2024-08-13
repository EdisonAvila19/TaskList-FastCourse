import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage () {
  const { register, handleSubmit, formState: { errors} } = useForm()
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(signup)

  return (
    <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        {
          RegisterErrors?.length > 0  && RegisterErrors.map((err, i) => (
            <div className='bg-red-500 p-2 my-1 text-white' key={ i }>{ err }</div>)
          )
        }

        <h1 className='text-2xl font-bold mb-5'>Register</h1>

        <form className='w-96 mb-5' onSubmit = { onSubmit } >
          <input type="text" placeholder='Username' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            {...register('username', { required: true })} />
          {
            errors.username && <p className='text-red-500'>Username is required</p>
          }
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
          <button type='submit' className='py-2 px-4 border rounded-lg mt-2'>
            Register
          </button>
        </form>

        <p className='flex gap-x-2 justify-between'>
          Already have an account? 
          <Link to='/login' className='text-sky-500'>Sign in</Link>
        </p>

      </div>
    </div>
  )
}
