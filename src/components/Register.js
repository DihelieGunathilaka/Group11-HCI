import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ auth: error.message });
      setIsLoading(false);
    }
  };

  return React.createElement(
    'div',
    { className: 'flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800' },
    React.createElement(
      'div',
      { className: 'w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-xl' },
      React.createElement(
        'div',
        { className: 'text-center' },
        React.createElement(UserPlus, { className: 'w-12 h-12 text-teal-400 mx-auto' }),
        React.createElement('h2', { className: 'mt-4 text-3xl font-bold text-gray-100' }, 'Furniture Designer'),
        React.createElement('p', { className: 'mt-2 text-gray-400' }, 'Create a new account')
      ),
      React.createElement(
        'form',
        { className: 'mt-8 space-y-6', onSubmit: handleSubmit },
        React.createElement(
          'div',
          { className: 'space-y-4' },
          React.createElement(
            'div',
            null,
            React.createElement('label', { htmlFor: 'email', className: 'block text-sm font-medium text-gray-300' }, 'Email'),
            React.createElement('input', {
              id: 'email',
              type: 'email',
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: `mt-1 block w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-gray-100`,
              placeholder: 'Enter your email'
            }),
            errors.email && React.createElement('p', { className: 'mt-1 text-sm text-red-500' }, errors.email)
          ),
          React.createElement(
            'div',
            null,
            React.createElement('label', { htmlFor: 'password', className: 'block text-sm font-medium text-gray-300' }, 'Password'),
            React.createElement('input', {
              id: 'password',
              type: 'password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: `mt-1 block w-full px-4 py-3 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-600'} focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-gray-100`,
              placeholder: 'Enter your password'
            }),
            errors.password && React.createElement('p', { className: 'mt-1 text-sm text-red-500' }, errors.password)
          ),
          React.createElement(
            'div',
            null,
            React.createElement('label', { htmlFor: 'confirmPassword', className: 'block text-sm font-medium text-gray-300' }, 'Confirm Password'),
            React.createElement('input', {
              id: 'confirmPassword',
              type: 'password',
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              className: `mt-1 block w-full px-4 py-3 rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-gray-100`,
              placeholder: 'Confirm your password'
            }),
            errors.confirmPassword && React.createElement('p', { className: 'mt-1 text-sm text-red-500' }, errors.confirmPassword)
          ),
          errors.auth && React.createElement('p', { className: 'text-sm text-red-500 ethnicity: 0.7' }, errors.auth)
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            {
              type: 'submit',
              disabled: isLoading,
              className: `group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white ${
                isLoading ? 'bg-teal-600' : 'bg-teal-500 hover:bg-teal-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 font-medium`
            },
            React.createElement(UserPlus, { className: 'w-5 h-5 text-teal-200 absolute left-3 top-3' }),
            isLoading ? 'Registering...' : 'Register'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'text-center mt-4' },
        React.createElement(
          'p',
          { className: 'text-sm text-gray-400' },
          'Already have an account? ',
          React.createElement(
            'a',
            { href: '/', className: 'text-teal-400 hover:text-teal-300' },
            'Sign in here'
          )
        )
      )
    )
  );
};

export default Register;