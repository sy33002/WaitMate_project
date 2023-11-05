import { Link } from 'react-router-dom';

export const wmSubmenu = (
  <div className='flex'>
    <Link to='/waitMate/'>
      <div className='mx-3'>register</div>
    </Link>
    <Link to='/waitMate/list'>
      <div>list</div>
    </Link>
  </div>
);

export const proxySubmenu = (
  <div className='flex'>
  <Link to='/proxy/register'>
    <div>register</div>
  </Link>
  <Link to='/proxy/list'>
    <div>list</div>
  </Link>
  </div>
);

export const mychatSubmenu = (
<div className='flex'>
  <Link to='/mypage/singup'>
    <div>Chat List</div>
  </Link>
  </div>
);
