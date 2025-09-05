// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

// const LoginForm = () => {
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState(false);

//   const onSubmit = async (data) => {
//     const result = await login(data.email, data.password);
//     if (result.success) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
//           <p className="mt-2 text-gray-600">Sign in to continue learning</p>
//         </div>
        
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 {...register('email', {
//                   required: 'Email is required',
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: 'Invalid email address'
//                   }
//                 })}
//                 type="email"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your email"
//               />
//             </div>
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: {
//                     value: 6,
//                     message: 'Password must be at least 6 characters'
//                   }
//                 })}
//                 type={showPassword ? 'text' : 'password'}
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {isSubmitting ? 'Signing in...' : 'Sign In'}
//           </button>

//           <div className="text-center">
//             <p className="text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logoImage from '../../assets/images/polyglo.png';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-duo-gray-light">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-duo-green bg-opacity-20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-duo-blue bg-opacity-20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-duo-yellow bg-opacity-20 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Logo Section */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-duo-green rounded-full flex items-center justify-center animate-bounce-gentle">
              <img 
                src={logoImage} 
                alt="Polyglo Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          <h2 className="text-4xl font-black text-dark">Welcome back!</h2>
          <p className="mt-3 text-lg text-light font-bold">Sign in to continue learning</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-blue rounded-full flex items-center justify-center">
                <Mail className="w-3 h-3 text-white" />
              </div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-duo-red font-bold">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-purple rounded-full flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-14 pr-14 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light hover:text-dark transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-duo-red font-bold">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark focus:ring-2 focus:ring-duo-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-black text-lg uppercase tracking-wide transform hover:scale-105 shadow-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="text-center">
            <p className="text-light font-bold">
              Don't have an account?{' '}
              <Link to="/signup" className="text-duo-blue hover:text-duo-blue font-black hover:underline transition-all duration-200">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
