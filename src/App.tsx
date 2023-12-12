import Layout from "./components/Layout";
import AppRouter from "./util/AppRouter";
import { AuthProvider } from "./util/AuthContext";

function App() {
  return (
    <Layout>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Layout>
  );
}

export default App;
