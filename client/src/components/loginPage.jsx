import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useLoginMutation } from "../api/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const schema = yup.object().shape({
    email: yup.string().email().required('Email obligatoire'),
    password: yup.string().min(3, 'il faut au m oins 3 caracteres').required(),
});

export default function LoginPage() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
    const [login, {data, isLoading, isSuccess, isError, error}] = useLoginMutation();
    useEffect(() => {
        if(isSuccess) {
            localStorage.setItem('user', JSON.stringify(data))
                navigate('/notes');
        }
    }, [isSuccess]);

    const onSubmit = (data) => {
        login(data);
    };
  
  return (
    <div className="min-h-screen w-full grid grid-cols-2 place-items-center">
      <div className="px-8 w-full flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-4">Se connecter</h1>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4 w-full max-w-lg">
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-lg w-full" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              className="border border-gray-400 rounded-lg p-2"
            />
            {
                errors.email && <p className="text-red-500">{errors.email.message}</p>
            }
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="password">Mot de passe</label>
            <input
                {...register("password")}
              type="password"
              name="password"
              id="password"
              className="border border-gray-400 rounded-lg p-2"
            />
            {
                errors.password && <p className="text-red-500">{errors.password.message}</p>
            }
          </div>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'bg-blue-200 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Chargement...' : 'Se connecter'}
          </button>

          <a href="http://"></a>
        </form>
      </div>
      <div>
        <img src="/src/assets/images/login.jpg" alt="" />
      </div>
    </div>
  );
}
