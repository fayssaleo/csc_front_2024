import './Navbar.css'
import { connect } from 'react-redux'

const Navbar = props => {
    const isAdmin = props.login.role === 'ADMIN'

    return (<>  
<div tabindex="0" class="menu">
    <div class="menu-dropdown">
        <span onClick={() => props.history.push('/home/home')}><i class="fas fa-home"></i> Home</span>
        {isAdmin && <span onClick={() => props.history.push('/home/showallusers')}><i class="fas fa-user-cog"></i> Manage Users</span> }
        <span onClick={() => props.history.push('/home/showprofile')}><i class="fas fa-user"></i> My Profile</span>
        <span onClick={() => props.history.push('/home/change')}><i class="fas fa-key"></i> Change Password</span>
        <span onClick={props.logout}><i class="fas fa-sign-out-alt"></i> Logout</span>

    </div>
</div>
        </>
        )
}

const mapStateToProps = state => ({ login: state.login });

export default connect(mapStateToProps)(Navbar)