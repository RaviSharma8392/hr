import React from "react";

const LoginUser = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-16 px-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#161621] tracking-tight mb-3">
          Welcome back
        </h2>
        <p className="text-[15px] text-[#5A5A6B] font-light">
          Log in to your Nexus HRM account to continue.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-[#FCFCFD] py-10 px-8 border border-[#DCDCE5] rounded-2xl sm:px-12 shadow-sm shadow-[#161621]/5">
          <form className="space-y-6" action="#" method="POST">
            {/* Work Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#161621] mb-2">
                Work email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="jane@company.com"
                  className="appearance-none block w-full px-4 py-3 bg-transparent border border-[#DCDCE5] rounded-xl text-[#161621] text-[15px] placeholder-[#A0A0B2] focus:outline-none focus:border-[#161621] focus:ring-1 focus:ring-[#161621] transition-colors duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#161621] mb-2">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="appearance-none block w-full px-4 py-3 bg-transparent border border-[#DCDCE5] rounded-xl text-[#161621] text-[15px] placeholder-[#A0A0B2] focus:outline-none focus:border-[#161621] focus:ring-1 focus:ring-[#161621] transition-colors duration-200"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password Options */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#161621] focus:ring-[#161621] border-[#DCDCE5] rounded bg-transparent cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[#5A5A6B] cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-[#161621] hover:underline decoration-[#DCDCE5] underline-offset-4 transition-all duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full text-[15px] font-medium text-[#F4F4F9] bg-[#161621] hover:bg-[#2C2C3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#161621] transition-colors duration-200">
                Log in
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DCDCE5]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#FCFCFD] text-[#6B6B8A] font-light">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google SSO Button */}
            <div className="mt-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-[#DCDCE5] rounded-full text-[15px] font-medium text-[#161621] bg-transparent hover:border-[#B2B2C2] hover:bg-[#F4F4F9] transition-all duration-200">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>

        {/* Registration Link */}
        <p className="mt-8 text-center text-[15px] text-[#5A5A6B]">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-[#161621] hover:underline decoration-[#DCDCE5] underline-offset-4 transition-all duration-200">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
