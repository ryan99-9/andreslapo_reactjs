import React from 'react'
import {
    Nav,
    Navbar,
    Dropdown,
    Button,
    Image,
    Badge
} from 'react-bootstrap'
import { LOGO } from '../assets'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'
// import { Navigate } from 'react-router-dom'

class NavigationBar extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         toLogin: false,
    //         toCart: false
    //     }
    // }

    // onCart = () => {
    //     if (this.props.username) {
    //         this.setState({ toCart: true })
    //     } else {
    //         this.setState({ toLogin: true })
    //     }
    // }

    render() {
        // if (this.state.toCart) {
        //     return <Navigate to='/cart' />
        // } else if (this.state.toLogin) {
        //     return <Navigate to='/login' />
        // }

        return (
            <Navbar fixed='top' className='px-5' style={styles.navbar} expand="lg">
                <Navbar.Brand href="#home">
                    <Image style={styles.image} src={LOGO} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link style={styles.navLink} as={Link} to='/' >Home</Nav.Link>
                        <Nav.Link style={styles.navLink} href="#link">Product</Nav.Link>
                        <Nav.Link style={styles.navLink} href="#link">Contact Us</Nav.Link>
                    </Nav>
                    {this.props.role === 'user' ?
                        <Button variant="outline-warning" as={Link} to="/cart" >
                            <i className="fa-solid fa-cart-shopping"></i>
                            <Badge pill bg="warning" text="dark">
                                {this.props.cart.length}
                            </Badge>
                        </Button>
                        :
                        null
                    }
                    <Dropdown style={{ marginLeft: '10px' }}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {this.props.username ? this.props.username : "Username"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.props.username ?
                                <>
                                    <Dropdown.Item as={Link} to={this.props.role === 'admin' ? '/historyadmin' : '/history'}>History</Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
                                </>
                                :
                                <>
                                    <Dropdown.Item as={Link} to='/login' >Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
                                </>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const styles = {
    navbar: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    image: {
        height: '40px'
    },
    navLink: {
        color: 'white'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        role: state.userReducer.role
    }
}


export default connect(mapStateToProps, { logout })(NavigationBar)