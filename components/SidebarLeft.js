export default function SidebarLeft() {
  return (
    <div className='h-full w-64 bg-backgroundColor h-full'>
      <div className='flex justify-end'>
        <img
          src='show_sidebar_icon.png'
          alt='showSideBar'
          className='p-4  '
        ></img>
      </div>
      <div className='flex justify-center'>
        <img src='logofinal.png' alt='logo' className='w-20 h-20 m-4'></img>
      </div>
      <div>
        <div className='flex items-center justify-normal'>
          <img src='bookmark-solid.png'></img>
          <p className='items-center'>Favoris</p>
        </div>
        <div>
          <p>Yo fdp</p>
          <p>Yo frais de port</p>
          <p>Yo test</p>
        </div>
      </div>
    </div>
  );
}
