import React, { useState, useEffect } from "react";

const CompanyDashboard = () => {
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Demonstration State (Loading, Error, Empty, Success)
  const [viewState, setViewState] = useState("loading");

  // Role-Based Rendering Demonstration
  const [userRole, setUserRole] = useState("Super Admin"); // Switch to "HR Admin" to see changes

  // Simulate initial data load
  useEffect(() => {
    const timer = setTimeout(() => setViewState("success"), 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- MOCK DATA ---
  const stats = [
    { title: "Total Employees", value: "248", trend: "+12%", icon: "👥" },
    { title: "Active Employees", value: "235", trend: "+5%", icon: "🟢" },
    { title: "New Hires", value: "14", trend: "This month", icon: "🎉" },
    {
      title: "Pending Leaves",
      value: "8",
      trend: "Needs review",
      icon: "⏳",
      alert: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex selection:bg-red-100">
      {/* ==========================================
          MOBILE SIDEBAR OVERLAY
      ========================================== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ==========================================
          SIDEBAR NAVIGATION
      ========================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold mr-3">
              Nx
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Nexus HR
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <NavItem active icon="📊" label="Dashboard" />
            <NavItem icon="👥" label="Employees" />
            <NavItem icon="⏱️" label="Attendance" />
            <NavItem icon="🏖️" label="Leave Management" />
            <NavItem icon="💰" label="Payroll" />
            <NavItem icon="🤝" label="Recruitment" />
            <NavItem icon="📈" label="Performance" />
            <NavItem icon="📑" label="Reports" />

            {/* ROLE-BASED CONDITIONAL RENDERING */}
            {userRole === "Super Admin" && (
              <div className="pt-6 mt-6 border-t border-slate-100">
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Admin
                </p>
                <NavItem icon="⚙️" label="Settings" />
                <NavItem icon="🛡️" label="Security" />
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT WRAPPER
      ========================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-900 focus:outline-none mr-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">
              Overview
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search employees..."
                className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-4 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-700 leading-tight">
                    Jane Doe
                  </p>
                  <p className="text-xs text-slate-500">{userRole}</p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Settings
                  </a>
                  <div className="border-t border-slate-100 my-1"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ==========================================
            DASHBOARD CONTENT AREA
        ========================================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* --- STATE SIMULATOR CONTROLS (For viewing purposes only) --- */}
          <div className="mb-8 p-4 bg-white rounded-xl border border-slate-200 flex flex-wrap gap-4 items-center justify-between shadow-sm">
            <div className="text-sm font-medium text-slate-500">
              View State Simulator:
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewState("loading")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${viewState === "loading" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                Loading
              </button>
              <button
                onClick={() => setViewState("empty")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${viewState === "empty" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                Empty
              </button>
              <button
                onClick={() => setViewState("error")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${viewState === "error" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                Error
              </button>
              <button
                onClick={() => setViewState("success")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${viewState === "success" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                Success
              </button>
            </div>
            <div className="flex gap-2 items-center border-l border-slate-200 pl-4">
              <span className="text-xs font-medium text-slate-500">Role:</span>
              <select
                className="text-xs bg-slate-100 border-none rounded-lg focus:ring-0"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}>
                <option>Super Admin</option>
                <option>HR Admin</option>
              </select>
            </div>
          </div>

          {/* --- LOADING STATE --- */}
          {viewState === "loading" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white h-32 rounded-xl border border-slate-200"></div>
              ))}
              <div className="lg:col-span-2 bg-white h-80 rounded-xl border border-slate-200 mt-6"></div>
              <div className="lg:col-span-2 bg-white h-80 rounded-xl border border-slate-200 mt-6"></div>
            </div>
          )}

          {/* --- ERROR STATE --- */}
          {viewState === "error" && (
            <div className="bg-white border border-red-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Failed to load dashboard
              </h3>
              <p className="text-slate-500 mb-6 max-w-sm">
                We encountered a secure connection error while fetching your
                organization's data. Please try again.
              </p>
              <button
                onClick={() => setViewState("loading")}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
                Retry Connection
              </button>
            </div>
          )}

          {/* --- EMPTY STATE --- */}
          {viewState === "empty" && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-3xl mb-4">
                🏢
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Welcome to Nexus HR
              </h3>
              <p className="text-slate-500 mb-6 max-w-sm">
                Your dashboard is looking a bit empty. Start by adding your
                first employee to populate these charts.
              </p>
              <button className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Employee
              </button>
            </div>
          )}

          {/* --- SUCCESS STATE (Actual Dashboard) --- */}
          {viewState === "success" && (
            <>
              {/* Top Widgets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-2xl">{stat.icon}</div>
                      {stat.alert && (
                        <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">
                        {stat.title}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900">
                          {stat.value}
                        </span>
                        <span
                          className={`text-xs font-semibold ${stat.alert ? "text-red-600" : "text-emerald-600"}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Attendance Chart (Simulated) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      Attendance Overview
                    </h3>
                    <select className="text-sm border-slate-200 rounded-lg text-slate-500 focus:ring-slate-900">
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  {/* Mock Bar Chart */}
                  <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 mt-4">
                    {[60, 80, 100, 90, 70, 40, 20].map((height, i) => (
                      <div
                        key={i}
                        className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="w-full bg-slate-100 rounded-t-lg relative h-full flex items-end overflow-hidden">
                          <div
                            className="w-full bg-slate-800 rounded-t-lg group-hover:bg-red-600 transition-colors duration-300"
                            style={{ height: `${height}%` }}></div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Distribution (Simulated Donut) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">
                    Department Distribution
                  </h3>
                  <div className="flex-1 flex items-center justify-center relative">
                    {/* Simulated SVG Donut Chart */}
                    <svg
                      viewBox="0 0 36 36"
                      className="w-48 h-48 circular-chart text-slate-800">
                      <path
                        className="stroke-current text-slate-100"
                        strokeWidth="4"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="stroke-current text-slate-800"
                        strokeDasharray="60, 100"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="stroke-current text-red-600"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-60"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text
                        x="18"
                        y="20.35"
                        className="text-xs font-bold fill-slate-900"
                        textAnchor="middle">
                        100%
                      </text>
                    </svg>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-800"></span>
                        Engineering
                      </span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-600"></span>
                        Sales
                      </span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                        Other
                      </span>
                      <span className="font-semibold">15%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payroll Summary Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900">
                    Recent Payroll Runs
                  </h3>
                  <a
                    href="#"
                    className="text-sm font-semibold text-red-600 hover:text-red-700">
                    View All
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Pay Period</th>
                        <th className="px-6 py-4">Processing Date</th>
                        <th className="px-6 py-4">Total Amount</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          Oct 15 - Oct 31, 2024
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          Nov 01, 2024
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          $124,500.00
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          Oct 01 - Oct 14, 2024
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          Oct 15, 2024
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          $122,100.00
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          Sep 15 - Sep 30, 2024
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          Oct 01, 2024
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          $120,400.00
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            Archived
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

// --- Helper Component for Sidebar Items ---
const NavItem = ({ icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 group ${
      active
        ? "bg-slate-50 text-red-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`}>
    <span
      className={`mr-3 text-lg ${active ? "" : "opacity-70 group-hover:opacity-100"}`}>
      {icon}
    </span>
    {label}
  </a>
);

export default CompanyDashboard;
