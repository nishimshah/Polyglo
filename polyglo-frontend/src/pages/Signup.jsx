
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
// import logoImage from '../assets/images/polyglo.png';

// const Signup = () => {
//   const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
//   const { register: registerUser } = useAuth();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

//   const onSubmit = async (data) => {
//     const result = await registerUser(data);
//     if (result.success) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-duo-gray-light py-12">
//       {/* Background Elements */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-20 right-10 w-32 h-32 bg-duo-yellow bg-opacity-20 rounded-full blur-2xl animate-float"></div>
//         <div className="absolute bottom-20 left-10 w-40 h-40 bg-duo-purple bg-opacity-20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
//         <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-duo-red bg-opacity-20 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
//       </div>

//       <div className="relative z-10 max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
//         {/* Logo Section */}
//         <div className="text-center">
//           <div className="flex justify-center mb-6">
//             <div className="w-16 h-16 bg-duo-green rounded-full flex items-center justify-center animate-bounce-gentle">
//               <img 
//                 src={logoImage} 
//                 alt="Polyglo Logo" 
//                 className="w-12 h-12 object-contain"
//               />
//             </div>
//           </div>
//           <h2 className="text-4xl font-black text-dark">Create Account</h2>
//           <p className="mt-3 text-lg text-light font-bold">Start your language learning journey</p>
//         </div>
        
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">Username</label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-purple rounded-full flex items-center justify-center">
//                 <User className="w-3 h-3 text-white" />
//               </div>
//               <input
//                 {...register('username', { required: 'Username is required' })}
//                 type="text"
//                 className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
//                 placeholder="Enter your username"
//               />
//             </div>
//             {errors.username && <p className="mt-2 text-sm text-duo-red font-bold">{errors.username.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">Email Address</label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-blue rounded-full flex items-center justify-center">
//                 <Mail className="w-3 h-3 text-white" />
//               </div>
//               <input
//                 {...register('email', {
//                   required: 'Email is required',
//                   pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
//                 })}
//                 type="email"
//                 className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
//                 placeholder="Enter your email"
//               />
//             </div>
//             {errors.email && <p className="mt-2 text-sm text-duo-red font-bold">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">Password</label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-red rounded-full flex items-center justify-center">
//                 <Lock className="w-3 h-3 text-white" />
//               </div>
//               <input
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: { value: 6, message: 'Password must be at least 6 characters' }
//                 })}
//                 type={showPassword ? 'text' : 'password'}
//                 className="w-full pl-14 pr-14 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light hover:text-dark transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && <p className="mt-2 text-sm text-duo-red font-bold">{errors.password.message}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">Confirm Password</label>
//             <div className="relative">
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-yellow rounded-full flex items-center justify-center">
//                 <Lock className="w-3 h-3 text-white" />
//               </div>
//               <input
//                 {...register('password_confirm', {
//                   required: 'Please confirm your password',
//                   validate: value => value === watch('password') || 'Passwords do not match'
//                 })}
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 className="w-full pl-14 pr-14 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
//                 placeholder="Confirm your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light hover:text-dark transition-colors"
//               >
//                 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password_confirm && <p className="mt-2 text-sm text-duo-red font-bold">{errors.password_confirm.message}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark focus:ring-2 focus:ring-duo-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-black text-lg uppercase tracking-wide transform hover:scale-105 shadow-lg"
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating Account...
//               </span>
//             ) : (
//               'Create Account'
//             )}
//           </button>

//           <div className="text-center">
//             <p className="text-light font-bold">
//               Already have an account?{' '}
//               <Link to="/login" className="text-duo-blue hover:text-duo-blue font-black hover:underline transition-all duration-200">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import logoImage from '../assets/images/polyglo.png';

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-duo-gray-light py-12">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-duo-yellow bg-opacity-20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-duo-purple bg-opacity-20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-duo-red bg-opacity-20 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* WIDER FORM CONTAINER */}
      <div className="relative z-10 max-w-2xl w-full space-y-6 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Logo Section - More Compact */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-duo-green rounded-full flex items-center justify-center animate-bounce-gentle">
              <img 
                src={logoImage} 
                alt="Polyglo Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          <h2 className="text-3xl font-black text-dark">Create Account</h2>
          <p className="mt-2 text-lg text-light font-bold">Start your language learning journey</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* HORIZONTAL LAYOUT FOR FIRST ROW */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-black text-dark mb-2 uppercase tracking-wide">Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-purple rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <input
                  {...register('username', { required: 'Username is required' })}
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
                  placeholder="Enter username"
                />
              </div>
              {errors.username && <p className="mt-1 text-sm text-duo-red font-bold">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-black text-dark mb-2 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-blue rounded-full flex items-center justify-center">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                  })}
                  type="email"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-duo-red font-bold">{errors.email.message}</p>}
            </div>
          </div>

          {/* HORIZONTAL LAYOUT FOR PASSWORD ROW */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label className="block text-sm font-black text-dark mb-2 uppercase tracking-wide">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-red rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light hover:text-dark transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-duo-red font-bold">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-black text-dark mb-2 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-yellow rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
                <input
                  {...register('password_confirm', {
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold text-dark placeholder-light transition-all duration-200"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light hover:text-dark transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password_confirm && <p className="mt-1 text-sm text-duo-red font-bold">{errors.password_confirm.message}</p>}
            </div>
          </div>

          {/* SUBMIT BUTTON - FULL WIDTH */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark focus:ring-2 focus:ring-duo-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-black text-lg uppercase tracking-wide transform hover:scale-105 shadow-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          {/* LOGIN LINK */}
          <div className="text-center">
            <p className="text-light font-bold">
              Already have an account?{' '}
              <Link to="/login" className="text-duo-blue hover:text-duo-blue font-black hover:underline transition-all duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
