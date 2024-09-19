import '@/ComponentCss/NavBar.css'

const NavBar = () => {
    return (
        <nav className='navBar'>
            
            <p className='logo'>Build</p>   
            
            <div className='tools'>
            <i className="fa-brands fa-github"></i>
            <i className="fa-brands fa-instagram"></i>
            </div>

        </nav>
    ) ;
}

export default NavBar ;