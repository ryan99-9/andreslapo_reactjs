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
import Footer from '../component/footer'
import Swal from 'sweetalert2'

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
        let password = username
        // console.log(username, password)

        // kalau ada input yg masih kosong maka muncul Swal.fire data tidak boleh kosong
        if (!username || !password) {
            return this.setState({ error: true })
        }

        // cek apakah input yg dimasukkan sudah ada di data user di database
        this.props.login(username, password)
    }

    render() {
        // jika login berhasil maka pindah kehalaman home
        if (this.props.username) {
            return <Navigate to="/" />
        }

        const { visibility } = this.state

        return (
            <div>
                <div style={styles.cont}>
                    <NavigationBar />
                    <div style={styles.contForm}>
                        <h1 style={{ color: 'orange' }}>Halo,</h1>
                        <h3 style={{ color: 'orange' }} className='mb-4'>Selamat Datang !</h3>
                        <Form.Label style={styles.fontColor}>Masukan Nomer Meja Anda</Form.Label>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text id="basic-addon1">
                                <i className='fa-solid fa-user'></i>
                            </InputGroup.Text>
                            <Form.Control ref="username" placeholder="Nomer Meja" />
                        </InputGroup>
                        {/* <Form.Label style={styles.fontColor}>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                                {visibility ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                            </InputGroup.Text>
                            <Form.Control
                                ref='password'
                                type={visibility ? 'text' : 'password'}
                                placeholder="Masukkan Password Anda" />
                        </InputGroup> */}
                        <div style={styles.contButton}>
                            <Button variant="warning" onClick={this.onLogin}>
                                <i style={{ marginRight: '10px' }} className="fa-solid fa-door-open"></i>
                                Login
                            </Button>
                        </div>
                        {/* <p style={styles.parRegislink}>Belum punya akun? <Link style={styles.regisLink} to='/register'>Register</Link></p> */}
                    </div>
                    <Modal show={this.state.error}>
                        <Modal.Header closeButton>
                            <Modal.Title>ERROR</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Username dan Password harus diisi</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={() => this.setState({ error: false })} variant="warning">OK</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.props.errorLogin}>
                        <Modal.Header closeButton>
                            <Modal.Title>ERROR</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Akun ini belum terdaftar.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.props.errLoginFalse} variant="warning">OK</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Footer />
            </div>
        )
    }
}



const styles = {
    cont: {
        background: "url(https://i.pinimg.com/564x/4d/1a/a3/4d1aa3fc54edbaae1e425f3ef4ab2235.jpg) center",
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        // flexDirection:'column',
        justifyContent: 'center'
    },
    contForm: {
        width: '50vh',
        height: 'fit-content',
        marginTop: '20vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '5vh',
        borderRadius: '20px'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
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

export default connect(mapStateToProps, { login, errLoginFalse })(LoginPage)