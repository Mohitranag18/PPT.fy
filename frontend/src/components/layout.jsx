import Header from "./header";

const Layout = ({ children }) => {
    return (
      <div className="bg-white flex flex-col justify-center items-center">
        <Header />
        {children}
      </div>
    );
  };
  
  export default Layout;
  