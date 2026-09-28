import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppToaster from "./components/ui/Toast";
import { seedIfEmpty } from "./utils/storage";

import PublicLayout from "./components/public/PublicLayout";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import NewCarLoan from "./pages/loans/NewCarLoan";
import UsedCarLoan from "./pages/loans/UsedCarLoan";
import Refinance from "./pages/loans/Refinance";
import Legal from "./pages/legal/Legal";

import CrmLogin from "./pages/CrmLogin";
import CrmAuthGuard from "./crm/CrmAuthGuard";
import CrmLayout from "./crm/CrmLayout";
import Dashboard from "./crm/Dashboard";
import Leads from "./crm/Leads";
import LeadDetails from "./crm/LeadDetails";
import Calls from "./crm/Calls";
import FollowUps from "./crm/FollowUps";
import NextCalls from "./crm/NextCalls";
import Customers from "./crm/Customers";
import CrmReviews from "./crm/Reviews";
import Reports from "./crm/Reports";
import ImportExcel from "./crm/ImportExcel";
import CrmSettings from "./crm/Settings";

import NotFound from "./pages/NotFound";

export default function App() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <AppToaster />
      <Routes>
        {/* Public website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/loans/new-car" element={<NewCarLoan />} />
          <Route path="/loans/used-car" element={<UsedCarLoan />} />
          <Route path="/loans/refinance" element={<Refinance />} />
          <Route path="/legal/:page" element={<Legal />} />
        </Route>

        {/* Hidden CRM (not linked from public nav) */}
        <Route path="/crm/login" element={<CrmLogin />} />
        <Route path="/crm" element={<CrmAuthGuard />}>
          <Route element={<CrmLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="leads/:id" element={<LeadDetails />} />
            <Route path="customers" element={<Customers />} />
            <Route path="calls" element={<Calls />} />
            <Route path="followups" element={<FollowUps />} />
            <Route path="next-calls" element={<NextCalls />} />
            <Route path="reviews" element={<CrmReviews />} />
            <Route path="reports" element={<Reports />} />
            <Route path="import" element={<ImportExcel />} />
            <Route path="settings" element={<CrmSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
