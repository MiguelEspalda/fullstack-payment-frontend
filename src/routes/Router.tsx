import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';
import PaymentInfoPage from '../pages/PaymentInfoPage';
import SummaryPage from '../pages/SummaryPage';
import StatusPage from '../pages/StatusPage';

export default function AppRouter() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/payment" element={<PaymentInfoPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/status" element={<StatusPage />} />
        </Routes>
        </BrowserRouter>
    );
}
