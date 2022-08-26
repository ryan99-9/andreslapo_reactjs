import React from 'react'
import '../styling/cart.css'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import NavigationBar from '../component/navigationBar'
import {
    Table,
    Image,
    Button,
    Form,
    Modal,
    InputGroup
} from 'react-bootstrap'
import { delCart, saveCart, checkout } from '../redux/actions'

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            indexEdit: null,
            qty: null,
            askPass: false,
            visibility: false,
            errPass: false,
            checkoutSucces: false
        }
    }

    showTableHead = () => {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>Gambar</th>
                    <th>Produk</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Total Harga</th>
                    <th>Opsi</th>
                </tr>
            </thead>
        )
    }

    showTableBody = () => {
        return (
            <tbody>
                {this.props.cart.map((item, index) => {
                    if (index === this.state.indexEdit) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image rounded className='image' src={item.image} />
                                </td>
                                <td>{item.name}</td>
                                <td>Rp. {item.price.toLocaleString()}/ pcs</td>
                                <td width='15%'>
                                    <div style={{ display: 'flex', justifyContent: "space-around", width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <Button onClick={this.onMinus} style={{ flexBasis: '20%' }} disabled={this.state.qty <= 1 ? true : false} variant='outline-danger'>-</Button>
                                        <Form.Control
                                            style={{ marginRight: '10px', marginLeft: '10px', flexBasis: '30%' }}
                                            value={this.state.qty}
                                            onClick={this.onInputClick}
                                            onKeyDown={(e) => this.onBackspace(e)}
                                            onChange={(e) => this.onInput(e, item.stock)}
                                        />
                                        <Button onClick={this.onPlus} variant='outline-success' disabled={this.state.qty >= item.stock ? true : false} style={{ flexBasis: '20%' }}  >+</Button>
                                    </div>
                                </td>
                                <td>Rp. {(item.qty * item.price).toLocaleString()}</td>
                                <td width='15%'>
                                    <Button variant='danger' className='me-3' onClick={() => this.setState({ indexEdit: null })}>Batal</Button>
                                    <Button variant='success' disabled={this.state.qty === ''} onClick={() => this.onSave(index)}>Simpan</Button>
                                </td>
                            </tr>
                        )
                    }
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Image rounded className='image' src={item.image} />
                            </td>
                            <td>{item.name}</td>
                            <td>Rp. {item.price.toLocaleString()}/ pcs</td>
                            <td width='15%'>{item.qty}</td>
                            <td>Rp. {(item.qty * item.price).toLocaleString()}</td>
                            <td width='15%'>
                                <Button variant='danger' className='me-3' onClick={() => this.onDelete(index)}>Hapus</Button>
                                <Button variant='secondary' onClick={() => this.onEdit(index)}>Edit</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    onDelete = (index) => {
        this.props.delCart(this.props.id, index)
    }

    onEdit = (index) => {
        this.setState({ indexEdit: index, qty: this.props.cart[index].qty })
    }

    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }

    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }

    onInputClick = () => {
        this.setState({ qty: '' })
    }

    onBackspace = (e) => {
        if (e.keyCode === 8) {
            this.setState({ qty: '' })
        }
    }

    onInput = (e, max) => {
        this.setState({ qty: 1 })
        let value = +e.target.value
        if (value < 1) {
            this.setState({ qty: 1 })
        } else if (value > max) {
            this.setState({ qty: max })
        } else if (value >= 1 || value <= max) {
            this.setState({ qty: value })
        }
    }

    onSave = (index) => {
        this.props.saveCart(this.props.id, index, this.state.qty)
        this.setState({ indexEdit: null })
    }

    onCheckOut = () => {
        this.setState({ askPass: true })
    }

    onOKPass = () => {
        // authorize user
        if(this.refs.passwordUser.value !== this.props.password) {
            return this.setState({errPass: true})
        }
        //siapkan data yg mau di push ke history
        let dataHistory = {
            idUser: this.props.id,
            username: this.props.username,
            time: new Date().toLocaleString(),
            products: this.props.cart
        }
        this.setState({askPass: false, errPass: false, checkoutSucces: true})

        this.props.checkout(this.props.id, dataHistory)
    }

    render() { 
        let idUserCheck = localStorage.getItem('idUser')
        if(!idUserCheck) {
            return <Navigate to='/login' />
        }
        const { visibility, errPass, checkoutSucces } = this.state
        return (
            <div>
                <NavigationBar />
                <div className='pageCont'>
                    <Table className='table' bordered hover variant='dark' striped>
                        {this.showTableHead()}
                        {this.showTableBody()}
                    </Table>
                    <Button onClick={this.onCheckOut} variant={this.props.cart.length === 0 ? 'danger' : 'success'} size='lg' disabled={this.props.cart.length === 0 ? true : false}><strong>{this.props.cart.length === 0 ? 'Keranjang Anda masih kosong' : 'Beli Sekarang'}</strong></Button>
                    <Button as={Link} to='/history' className='mt-3' variant='warning' size='lg'><strong>History</strong></Button>
                    <Modal
                        show={this.state.askPass}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={() => this.setState({ askPass: false, errPass: false })}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title style={{color: `${errPass ? 'red' : ''}`}} id="contained-modal-title-vcenter">
                                {errPass ? 'Password Salah, Silahkan coba kembali !' : 'Silahkan Masukkan Password Anda'}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputGroup style={{border: `${errPass ? 'red solid' : ''}`}} className="mb-3">
                                <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility: !visibility })}>
                                    {visibility ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                                </InputGroup.Text>
                                <Form.Control
                                    ref='passwordUser'
                                    type={visibility ? 'text' : 'password'}
                                    placeholder="Masukkan Password Anda" />
                                <Button onClick={this.onOKPass} variant="success" id="button-addon2">
                                    OK
                                </Button>
                            </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='danger' onClick={() => this.setState({ askPass: false, errPass: false })}>Batal</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={checkoutSucces}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={() => this.setState({ checkoutSucces: false })}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Transaksi Berhasil
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Silahkan klik HISTORY untuk melihat riwayat transaksi Anda</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='warning' onClick={() => this.setState({ checkoutSucces: false })}>OK</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        id: state.userReducer.id,
        password: state.userReducer.password
    }
}

export default connect(mapStateToProps, { delCart, saveCart, checkout })(CartPage)