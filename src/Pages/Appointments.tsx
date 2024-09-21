import AppointmentsTable from "../components/Appointments/AppointmentsTable"
import Layout from "./Layout";
function Appointments() {
  return (
    <div className="flex gap-20">
    <Layout />
    <AppointmentsTable />
  </div>
  )
}

export default Appointments