import { Link } from 'react-router-dom';

export const wmSubmenu = (
  <>
  <Link to='/waitMate/'>
    <li>register</li>
  </Link>
  <Link to='/waitMate/list'>
    <li>list</li>
  </Link>
  </>
);

export const proxySubmenu = (
  <>
  <Link to='/proxy/register'>
    <li>register</li>
  </Link>
  <Link to='/proxy/list'>
    <li>list</li>
  </Link>
  </>
);

export const mychatSubmenu = (
  <>
  <Link to='/mypage/singup'>
    <li>Chat List</li>
  </Link>
  </>
);
