import React from 'react'
import {
    InputGroup,
    Form,
    Button,
    Modal
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, errLoginFalse } from '../redux/actions'
import NavigationBar from '../component/navigationBar';

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            error: false,
        }
    }

    onLogin = () => {
        //ambil data dari input username & password
        let username = this.refs.username.value
        let password = this.refs.password.value
        // console.log(username, password)

        // kalau ada input yg masih kosong maka muncul alert data tidak boleh kosong
        if (!username || !password) {
            return this.setState({error: true})
        }

        // cek apakah input yg dimasukkan sudah ada di data user di database
        this.props.login(username, password)
    }

    render() {
        // jika login berhasil maka pindah kehalaman home
        if (this.props.username) {
            return <Navigate to="/"/>
        }
        
        const { visibility } = this.state

        return (
            <div style={styles.cont}>
                <NavigationBar />
                <div style={styles.contForm}>
                    <h1 style={{ color: 'orange' }}>Hello,</h1>
                    <h3 style={{ color: 'orange' }} className='mb-4'>Welcome back !</h3>
                    <Form.Label style={styles.fontColor}>Username</Form.Label>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id="basic-addon1">
                            <i className='fa-solid fa-user'></i>
                        </InputGroup.Text>
                        <Form.Control ref="username" placeholder="Input Your Username" />
                    </InputGroup>
                    <Form.Label style={styles.fontColor}>Password</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <Form.Control
                            ref='password'
                            type={visibility ? 'text' : 'password'}
                            placeholder="Input Your Password" />
                    </InputGroup>
                    <div style={styles.contButton}>
                        <Button variant="warning" onClick={this.onLogin}>
                            <i style={{marginRight: '10px'}} className="fa-solid fa-door-open"></i>
                            Login
                        </Button>
                    </div>
                    <p style={styles.parRegislink}>Don't have an account? <Link style={styles.regisLink} to='/register'>Register</Link></p>
                </div>
                <Modal show={this.state.error}>
                    <Modal.Header closeButton>
                        <Modal.Title>ERROR</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Username and Password must be filled</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.setState({error: false})} variant="warning">OK</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.props.errorLogin}>
                    <Modal.Header closeButton>
                        <Modal.Title>ERROR</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>This Account didn't exist.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.errLoginFalse} variant="warning">OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}



const styles = {
    cont: {
        background: "url(https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80) center",
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        // flexDirection:'column',
        justifyContent: 'center'
    },
    contForm: {
        width: '25vw',
        height: '65vh',
        marginTop: '20vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '2%',
        borderRadius: '20px'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'
    },
    fontColor: {
        color: 'white'
    },
    parRegislink: {
        textAlign: 'center',
        color: 'white'
    },
    regisLink: {
        color: 'orange',
    }
}

const mapStateToProps = (state) => {
    return {
        errorLogin: state.userReducer.errorLogin,
        username: state.userReducer.username
    }
}

export default connect(mapStateToProps, { login, errLoginFalse }) (LoginPage)