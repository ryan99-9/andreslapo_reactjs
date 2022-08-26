import React from "react";
import '../styling/notFound.css'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="pageCont">
                <div className="cont">
                    <h1 className="text1">404</h1>
                    <h2 className="text2">Not Found</h2>
                    <h2>Halaman yang anda cari Tidak Tersedia</h2>
                    <Button as={Link} to='/' className="tombol" size='lg' variant='warning'>Kembali ke Halaman Utama</Button>
                </div>
            </div>
        )
    }
}

export default NotFoundPage