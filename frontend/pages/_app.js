import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import LenisProvider from '../components/LenisProvider';
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AuthProvider>
        <LenisProvider>
          <Navbar />
          <Component {...pageProps} />
          <ToastContainer></ToastContainer>;
          <Footer/>
        </LenisProvider>
      </AuthProvider>
    </Layout>

  );
}

export default MyApp;