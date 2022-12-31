import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { connect } from 'react-redux'

//import pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisPage from './pages/register';
import DetailPage from './pages/detail';
import CartPage from './pages/cart';
import HistoryPage from './pages/history';
import HistoryAdminPage from './pages/historyAdmin';
import NotFoundPage from './pages/notFound';

//import actions
import { keepLogin } from './redux/actions'
import AddProductPage from './pages/addproducts';
import EditProduk from './pages/editproduk';

class App extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem('idUser')
    this.props.keepLogin(id)
  }
  render() {
    if (this.props.role === 'admin') {
      return (
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisPage />} />
            <Route path='/detail' element={<DetailPage />} />
            <Route path='/addproduct' element={<AddProductPage />} />
            <Route path='/historyadmin' element={<HistoryAdminPage />} />
            <Route path='/editproduk' element={<EditProduk />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      )
    } else if (this.props.role === 'user') {
      return (
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisPage />} />
            <Route path='/detail' element={<DetailPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/history' element={<HistoryPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      )
    }
    return (
      <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisPage />} />
            <Route path='/detail' element={<DetailPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/history' element={<HistoryPage />} />
            <Route path='/historyadmin' element={<HistoryAdminPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapStateToProps, { keepLogin })(App);
