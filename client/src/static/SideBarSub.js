import { Link } from 'react-router-dom';
import './sideBar.css';

export const wmSubmenu = (
  <div className='text-gray-500 text-base font-gmarket mt-4'>
    <Link to='/waitMate/register'>
      <li >register</li>
    </Link>
    <Link to='/waitMate/list'>
      <li className='mt-2'>list</li>
    </Link>
  </div>
);

export const proxySubmenu = (
  <div className='text-gray-500 text-base font-gmarket mt-4'>
    <Link to='/proxy/register'>
      <li>register</li>
    </Link>
    <Link to='/proxy/list'>
      <li className='mt-2'>list</li>
    </Link>
  </div>
);
