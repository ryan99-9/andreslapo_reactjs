import React from 'react'
import {
    InputGroup,
    Form,
    Button,
    Modal,

} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { register, resetRegErr } from '../redux/actions'
import axios  from 'axios'
import Swal from 'sweetalert2'

// const url = 'http://localhost:2000'
// const url = 'https://lizard-tux.cyclic.app'
const url = 'https://andres-lapo.onrender.com'


class AddProductPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            visibility2: false,
            usernameErr: false,
            emailErr: false,
            passErr: false,
            registerErr: [false, '']
        }
    }

  

    userValid = (e) => {
        // let symb = /[!@#$%^&*]/
        // if (symb.test(e.target.value) || e.target.value.length < 6) return this.setState({ usernameErr: true })
        this.setState({ usernameErr: false })
    }

    emailValid = (e) => {
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(e.target.value)) return this.setState({ emailErr: true })
        this.setState({ emailErr: false })
    }

    passValid = (e) => {
        let number = /[0-9]/
        let symb = /[!@#$%^&*]/
        if (!number.test(e.target.value) || !symb.test(e.target.value) || e.target.value.length < 6) return this.setState({ passErr: true })
        this.setState({ passErr: false })
    }
    
    

    onRegister = () => {
      
        // mempersiapkan data todo baru
        // let newTodo = this.refs.todo.value
       let name= this.refs.namaproduk.value
       let description= this.refs.deskripsi.value
       let price= this.refs.harga.value
       let stock= this.refs.stok.value
        let images= [this.refs.gambar.value]

        // siapkan objek
        let obj = {
            name,
            category:'',
            brand:'',
            rating:'',
            colour:'',
            description,
            price,
            stock,
            images
        }
        

        // menambah data baru di db json
        // <script src="https://unpkg.com/axios/dist/axios.min.js">
       
            axios.post(`${url}/products`, obj)
                .then(res => {
                    console.log(res.data)
                    // Axios.get('http://localhost:2000/activities')
                    //     .then(res => {
                    //         this.setState({ activities: res.data })
                    //     })
                    // this.fetchData()
                    // Swal.fire('Produk Berhasil Ditambahkan, silahkan cek di Home')
                    Swal.fire('Produk Berhasil Ditambahkan, silahkan cek di Home')
                
                })
                .catch(err =>{
                    console.log(err);
                })
        // </script>


        // untuk mengosongkan kembali form control
        this.refs.namaproduk.value = ''
        this.refs.deskripsi.value = ''
        this.refs.harga.value = ''
        this.refs.stok.value = ''
        this.refs.gambar.value = ''
    }
    
    // onRegister = () => {
    //     // let username = this.refs.username.value
    //     // let email = this.refs.email.value
    //     // let password = this.refs.password.value
    //     let username = this.refs.username.value
    //     let email = 'emailgenerate@gmail.com'
    //     let password = username

    //     // cek apakah semua input sudah terisi & valid
    //     // if (!username || !password || !email || this.state.usernameErr || this.state.emailErr || this.state.passErr) return this.setState({ registerErr: [true, 'Pastikan semua data sudah terisi & valid'] })

    //     // cek apakah confrim password = password
    //     // if (this.refs.confPassword.value !== password) return this.setState({ registerErr: [true, 'Pastikan Confirm Password sama dengan Password yang Anda masukkan'] })

    //     //siapkan objek utk user baru
    //     let obj = {
    //         username,
    //         email,
    //         password,
    //         role: 'user',
    //         cart: []
    //     }
        

    //     //action utk register
    //     // this.props.register(username, email, obj)
    //      register = (username, email, data) => {
    //         return (dispatch) => {
    //             // cek kesamaan username di database
                
    //                             Axios.post(`${url}/users`, data)
    //                                 .then(res => {
    //                                     return dispatch({
    //                                         type: 'SUCCESS_REGISTER'
    //                                     })
    //                                 })
    //                         // })
    //                 // })
    //         }
    //     }
    // }

    render() {
        // if (this.props.successReg) {
        //     return <Navigate to='/'/>
                

        // }

        const { visibility, visibility2 } = this.state

        return (
            <div style={styles.cont}>
                <div style={styles.contForm}>
                    <h2 style={{ color: 'orange' }}>Ingin Jajanan yang Mantap?</h2>
                    <h3 style={{ color: 'orange' }} className='mb-4'>Tambah Produk Baru!!!</h3>
                    <Form.Label style={styles.fontColor}>Nama Produk</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-user"></i>
                        </InputGroup.Text>
                        <Form.Control
                            onChange={(e) => this.userValid(e)}
                            ref='namaproduk'
                            placeholder="Nama Produk" />
                    </InputGroup>
                    <br />
                    {/* <Form.Label className="mt-1" style={styles.fontColor}>Jenis Produk</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                            ref='jenisproduk'
                            onChange={(e) => this.emailValid(e)}
                            placeholder="Makanan Utama, Dessert, dll" />
                    </InputGroup> */}
                    <Form.Label className="mt-1" style={styles.fontColor}>Deskripsi Produk</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                            ref='deskripsi'
                            onChange={(e) => this.emailValid(e)}
                            placeholder="Deskripsi produk" />
                    </InputGroup>
                    <br />
                    <Form.Label className="mt-1" style={styles.fontColor}>Stok Produk</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                            ref='stok'
                            onChange={(e) => this.emailValid(e)}
                            placeholder="Jumlah Stok" />
                    </InputGroup>
                    {/* <Form.Text className="text-danger">
                        {this.state.emailErr ? 'Email tidak valid' : ''}
                    </Form.Text> */}
                    <br />
                    <Form.Label className="mt-1" style={styles.fontColor}>Harga</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                            <i className="fa-solid fa-eye-slash"></i>
                        </InputGroup.Text>
                        <Form.Control
                            ref='harga'
                            onChange={(e) => this.passValid(e)}
                            // type='number'
                            placeholder="Masukkan Harga per Porsi" />
                    </InputGroup>
                    {/* <Form.Text className="text-danger">
                        {this.state.passErr ? 'Minimal 6 karakter terdiri dari huruf, angka, dan simbol' : ''}
                    </Form.Text> */}
                    <br />
                    <Form.Label className="mt-1" style={styles.fontColor}>Gambar Produk</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility2: !visibility2 })}>
                            <i className="fa-solid fa-eye"></i>
                        </InputGroup.Text>
                        <Form.Control
                            ref='gambar'
                            // type={visibility2 ? 'text' : 'password'}
                            placeholder="Masukan alamat URL gambar" />
                    </InputGroup>
                    <div style={styles.contButton}>
                        <Button onClick={this.onRegister} variant="warning">
                            <i style={{ marginRight: '10px' }} className="fa-solid fa-user-plus"></i>
                            Tambah Produk
                        </Button>
                    </div>
                    {/* <p style={styles.parRegislink}>Sudah punya akun? <Link style={styles.regisLink} to='/login'>Login</Link></p> */}
                    <p style={styles.parRegislink}>Kembali ke <Link style={styles.regisLink} to='/'>Home</Link></p>
                </div>
                
            </div>
        )
    }
}

const styles = {
    cont: {
        background: "url(https://images.unsplash.com/photo-1608582037152-adefa9decb70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80) center",
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'right'
    },
    contForm: {
        width: '100vh',
        marginTop: 'auto',
        marginRight: '10px',
        marginLeft: '10px',
        marginBottom: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '5%',
        paddingTop: '15px',
        borderRadius: '20px'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '10px'
    },
    fontColor: {
        color: 'white'
    },
    parRegislink: {
        textAlign: 'center',
        color: 'white',
        margin: '0px'
    },
    regisLink: {
        color: 'orange',
    }
}


const mapStateToProps = (state) => {
    return {
        errorReg: state.userReducer.errorRegister,
        successReg: state.userReducer.successRegister
    }
}

export default connect(mapStateToProps, { register, resetRegErr })(AddProductPage)