import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Navbar from "../components/Navigation/Navbar";
import Entry from "../pages/Entry";
import RandomBlessing from "../pages/RandomBlessing";
import Gratitude from "../pages/Gratitude";
import Spark from "../pages/Spark";

export const PrivateRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1480px] mx-auto py-4 px-3">
        <Routes>
          <Route path="/spark/" element={<HomePage />} />
          <Route path="/spark/entry" element={<Entry />} />
          <Route path="/spark/blessing" element={<RandomBlessing />} />
          <Route path="/spark/gratitude" element={<Gratitude />} />
          <Route path="/spark/hope" element={<Spark />} />

          <Route path="*" element={<Navigate to="/spark/" replace />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
};
