import { Link } from 'react-router-dom';

import { AuthButton } from './AuthButton';

const NavBar = () => (
<header className="bg-gray-800">
  <nav className="container mx-auto flex items-center justify-between p-4">
    <h1 className="text-white font-bold text-lg">Tasks App</h1>
    <ul className="flex space-x-4">
      <li>
        <Link to="/" href="#" className="text-white hover:text-gray-300">Home</Link>
      </li>
      <li>
        <Link to="/profile" href="#" className="text-white hover:text-gray-300">Profile</Link>
      </li>
      <li>
        <Link to="/board" href="#" className="text-white hover:text-gray-300">Board</Link>
      </li>
      <li>
      <AuthButton />
      </li>
    </ul>
  </nav>
</header>
);

export { NavBar };
