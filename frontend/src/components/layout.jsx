const Layout = ({ children }) => {
    return (
      <div className="w-screen h-screen bg-white flex justify-center items-center">
        {children}
      </div>
    );
  };
  
  export default Layout;
  