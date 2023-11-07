import { Link } from 'react-router-dom';

export const wmSubmenu = (
  <div className='flex justify-center text-gray-500 text-xs font-gmarket mt-2'>
    <Link to='/waitMate/register'>
      <div className='mx-1'>register</div>
    </Link>
    <Link to='/waitMate/list'>
      <div className='mx-1'>list</div>
    </Link>
  </div>
);

export const proxySubmenu = (
  <div className='flex justify-center text-gray-500 text-xs font-gmarket mt-2'>
  <Link to='/proxy/register'>
    <div className='mx-1' >register</div>
  </Link>
  <Link to='/proxy/list'>
    <div className='mx-1'>list</div>
  </Link>
  </div>
);

export const mychatSubmenu = (
<div className='flex justify-center text-gray-500 text-xs font-gmarket mt-2'>
  <Link to='/mypage/singup'>
    <div>Chat List</div>
  </Link>
  </div>
);
