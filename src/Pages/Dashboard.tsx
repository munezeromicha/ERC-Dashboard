import Layout from "./Layout";
import DashboardContent from '../components/DasboardContents/DashboardContents';

const Dashboard = () => {
  return (
    <div className="flex">
      <Layout />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
