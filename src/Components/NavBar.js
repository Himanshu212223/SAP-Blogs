import '@/ComponentCss/NavBar.css'

const NavBar = () => {
    return (
        <nav className='navBar'>
            
            <p className='logo'>Build</p>   
            
            <div className='tools'>
            <a href='https://github.com/Himanshu212223' target='_blank' className="fa-brands fa-github link"></a>
            <a href='https://instagram.com/_him.anshu' target='_blank' className="fa-brands fa-instagram link"></a>
            </div>

        </nav>
    ) ;
}

export default NavBar ;