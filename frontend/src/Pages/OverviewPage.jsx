import React from "react";

const OverviewPage = () => {
  return (
    <div className="min-h-full text-gray-100">
      <div className="max-w-6xl mx-auto rounded-lg shadow-lg p-8 space-y-8">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">PlugAPI Overview</h1>
          <p className="text-gray-300 italic">
            Welcome to the PlugAPI Overview page. This platform provides a ready-to-use
            authentication and user management system for your projects.
          </p>
        </div>

        {/* What is this platform */}
        <div className="rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">
            What is this API platform?
          </h2>
          <p className="text-gray-300">
            This API platform allows you to register users, authenticate them, view
            all registered users, and delete users without building these features
            from scratch. It saves development time and ensures your projects have
            secure and reliable user management.
          </p>
        </div>

        {/* Available Endpoints */}
        <div className="rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Available Endpoints</h2>
          <ul className="space-y-4">
            <li className="bg-zinc-900 rounded-md p-4">
              <p className="text-gray-100 font-medium">Register User</p>
              <p className="text-gray-300">POST: {'{Base_url}'}/{'{api_key}'}/user/register – Create a new user account by providing name, email, and password.</p>
            </li>
            <li className="bg-zinc-900 rounded-md p-4">
              <p className="text-gray-100 font-medium">Login User</p>
              <p className="text-gray-300">POST: {'{Base_url}'}/{'{api_key}'}/user/login – Authenticate an existing user and receive an access token.</p>
            </li>
            <li className="bg-zinc-900 rounded-md p-4">
              <p className="text-gray-100 font-medium">Show Users</p>
              <p className="text-gray-300">GET: {'{Base_url}'}/{'{api_key}'}/user/user_id – Retrieve a list of all registered users.</p>
            </li>
            <li className="bg-zinc-900 rounded-md p-4">
              <p className="text-gray-100 font-medium">Delete User</p>
              <p className="text-gray-300">DELETE:  {'{Base_url}'}/{'{api_key}'}/user/delete/{'{id}'} – Delete a user by their email.</p>
            </li>
          </ul>
        </div>

        {/* How to use */}
        <div className="rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">
            How to use these APIs?
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Register an account to start using the APIs.</li>
            <li>Login to get your JWT token for protected routes.</li>
            <li>Integrate endpoints in your frontend or backend projects for authentication and user management.</li>
          </ol>
        </div>

        {/* Who can use */}
        <div className="rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">
            Who can use these APIs?
          </h2>
          <p className="text-gray-300">
            Frontend developers, backend developers, and full-stack developers can integrate these APIs to build powerful projects faster without worrying about authentication logic.
          </p>
        </div>

        {/* Important notes */}
        <div className="rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Important Notes</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Always include your JWT token in the Authorization header for protected routes.</li>
            <li>Deleting a user is permanent and cannot be undone.</li>
          </ul>
        </div>

        {/* Final CTA */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Start integrating now
          </h2>
          <p className="text-gray-300">
            Use these APIs to build scalable and secure applications without reinventing authentication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
