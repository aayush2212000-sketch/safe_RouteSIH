import React, { useState } from 'react';
import { ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        // -------------------------
        // SIGN UP
        // -------------------------
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        alert(
          'Signup successful! The database trigger has assigned you the "user" role. Please log in.'
        );

        setIsSignUp(false);
      } else {
        // -------------------------
        // LOGIN
        // -------------------------
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (authError) throw authError;

        if (authData?.user) {
          /*
           * For the SIH demo, all authenticated users
           * are taken to the main Command Center.
           *
           * This does NOT change Supabase, API,
           * database tables, or user data.
           */
          navigate('/admin-dashboard');
        }
      }
    } catch (err: any) {
      console.error(err);

      setErrorMsg(
        err.message || 'An error occurred during authentication.'
      );
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // JUDGE DEMO MODE
  // -------------------------
  const handleDemoMode = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="h-screen w-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl z-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <div className="bg-orange-500 p-3 rounded-xl mb-4 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <ShieldCheck size={32} className="text-white" />
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            G.A.L.E. CORE
          </h1>

          <p className="text-zinc-500 text-sm">
            Geospatial Assessment & Logistics Engine
          </p>

        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-4 bg-red-950/50 border border-red-900 text-red-200 p-3 rounded-lg flex items-start gap-2 text-sm">

            <AlertCircle size={16} className="mt-0.5 shrink-0" />

            <p>{errorMsg}</p>

          </div>
        )}

        {/* Login Form */}
        <form
          className="space-y-4"
          onSubmit={handleAuth}
        >

          {/* Email */}
          <div>

            <label className="text-xs font-semibold text-zinc-400 uppercase ml-1">
              Email Address
            </label>

            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-all mt-1"
              type="email"
              placeholder="operator@gale.gov.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="text-xs font-semibold text-zinc-400 uppercase ml-1">
              Password
            </label>

            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-all mt-1"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg mt-4 transition-all transform active:scale-95 shadow-lg flex justify-center items-center h-[52px]"
          >

            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              isSignUp
                ? 'CREATE ACCOUNT'
                : 'LOGIN TO SYSTEM'
            )}

          </button>

        </form>

        {/* Signup / Login Toggle */}
        <div className="mt-4 text-center">

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-zinc-400 hover:text-white text-xs underline underline-offset-2"
          >
            {isSignUp
              ? 'Already have an account? Log in'
              : 'Need an account? Sign up'}
          </button>

        </div>

        {/* Demo Mode */}
        <div className="mt-6 pt-6 border-t border-zinc-800">

          <button
            onClick={handleDemoMode}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 rounded-lg border border-zinc-700 flex items-center justify-center gap-2 transition-all"
          >

            <Zap
              size={18}
              className="text-yellow-500"
            />

            JUDGE DEMO MODE (BYPASS)

          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-[10px] mt-8 uppercase tracking-widest">
          Authorized Access Only | GOVT OF INDIA
        </p>

      </div>

    </div>
  );
};