import { Link } from 'react-router-dom';

export const wmSubmenu = (
  <div className='text-gray-500 text-base'>
    <Link to='/waitMate/'>
      <li>register</li>
    </Link>
    <Link to='/waitMate/list'>
      <li>list</li>
    </Link>
  </div>
);

export const proxySubmenu = (
  <div className='text-gray-500 text-base'>
    <Link to='/proxy/register'>
      <li>register</li>
    </Link>
    <Link to='/proxy/list'>
      <li>list</li>
    </Link>
  </div>
);

export const mychatSubmenu = (
  <div className='text-gray-500 text-base'>
  <Link to='/mypage/singup'>
    <li>Chat List</li>
  </Link>
  </div>
);
