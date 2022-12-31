import React from 'react'
import '../styling/cart.css'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import NavigationBar from '../component/navigationBar'
import Footer from '../component/footer'
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
            checkoutSucces: false,
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
        
        //siapkan data yg mau di push ke history
        let dataHistory = {
            idUser: this.props.id,
            username: this.props.username,
            time: new Date().toLocaleString(),
            products: this.props.cart
        }
        this.setState({askPass: false, errPass: false, checkoutSucces: true})

        this.props.checkout(this.props.id, dataHistory)
        // Swal.fire('silahkan menunggu pesanan anda')
        Swal.fire('silahkan menunggu pesanan anda')

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
                    <Table responsive='sm' className='table' bordered hover variant='dark' striped>
                        {this.showTableHead()}
                        {this.showTableBody()}
                    </Table>
                    <Button onClick={this.onCheckOut} variant={this.props.cart.length === 0 ? 'danger' : 'success'} size='lg' disabled={this.props.cart.length === 0 ? true : false}><strong>{this.props.cart.length === 0 ? 'Keranjang Anda masih kosong' : 'Beli Sekarang'}</strong></Button>
                    {/* <Button as={Link} to='/history' className='mt-3' variant='warning' size='lg'><strong>History</strong></Button> */}
                    
                </div>
                <Footer />
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