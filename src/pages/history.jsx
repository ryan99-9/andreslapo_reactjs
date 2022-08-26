import React from 'react'
import NavigationBar from '../component/navigationBar'
import '../styling/history.css'
import Axios from 'axios'
import { Navigate } from 'react-router-dom'
import {
    Accordion,
    Table,
    Image
} from 'react-bootstrap'
// import { connect } from 'react-redux'

class HistoryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: []
        }
    }

    componentDidMount() {
        let idUser = localStorage.getItem('idUser')
        Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
            .then(res => {
                this.setState({ history: res.data })
            })
    }

    render() {
        let idUserCheck = localStorage.getItem('idUser')
        if(!idUserCheck) {
            return <Navigate to='/login' />
        }
        
        return (
            <div>
                <NavigationBar />
                <div className='pageCont'>
                    <h1 className='title'>Riwayat Transaksi</h1>
                    <Accordion>
                        {this.state.history.reverse().map((item, index) => {
                            return (
                                <Accordion.Item key={index} eventKey={index}>
                                    <Accordion.Header>Tanggal : {item.time}</Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Gambar</th>
                                                    <th>Produk</th>
                                                    <th>Harga</th>
                                                    <th>Jumlah</th>
                                                    <th>Total Harga</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.products.map((it, id) => {
                                                    return (
                                                        <tr>
                                                            <td>{id + 1}</td>
                                                            <td>
                                                                <Image rounded className='image' src={it.image} />
                                                            </td>
                                                            <td>{it.name}</td>
                                                            <td>Rp. {it.price.toLocaleString()}</td>
                                                            <td>{it.qty}</td>
                                                            <td>Rp. {(it.qty * it.price).toLocaleString()}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>

                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         username: state.userReducer.username
//     }
// }

export default HistoryPage