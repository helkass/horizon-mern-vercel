import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { Provider } from "react-redux";
import { store} from "./redux/store";
import CusContextProvider  from './redux/customer/CusContextProvider';
import AdminContextProvider from './redux/admin/AdminContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <CusContextProvider>
      <Provider store={store}>
          <App />
      </Provider>
    </CusContextProvider>
  </AdminContextProvider>
)
