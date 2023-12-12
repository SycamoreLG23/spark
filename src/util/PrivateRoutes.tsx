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
          <Route path="/" element={<HomePage />} />
          <Route path="entry" element={<Entry />} />
          <Route path="blessing" element={<RandomBlessing />} />
          <Route path="gratitude" element={<Gratitude />} />
          <Route path="spark" element={<Spark />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
};
