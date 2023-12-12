/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "../assets/Logo.svg";

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../util/AuthContext";
import GratitudeCard from "../components/GratitudeCard/GratitudeCard";
import Modal from "../components/UI/Modal";

type GratitudeEntry = {
  id: string;
  entry: string;
  timestamp: string;
};

const Gratitude = () => {
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const { setError, user } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const fetchGratitudeEntries = async () => {
      try {
        if (user) {
          const entriesCollection = collection(db, "gratitudeEntries");

          // Use a query to filter entries based on the user's UID
          const userEntriesQuery = query(
            entriesCollection,
            where("userId", "==", user.uid)
          );

          const entriesSnapshot = await getDocs(userEntriesQuery);
          const entriesData: GratitudeEntry[] = [];

          entriesSnapshot.forEach((entryDoc) => {
            const entryData = entryDoc.data();
            entriesData.push({
              id: entryDoc.id,
              entry: entryData.entry,
              timestamp: entryData.timestamp.toDate(),
            });
          });
          entriesData.sort((a, b) => +b.timestamp - +a.timestamp);
          setGratitudeEntries(entriesData);
        }
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching gratitude entries: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGratitudeEntries();
  }, [user, setError]);

  const handleDeleteEntry = async (entryId: string) => {
    setDeleting(true);
    try {
      // Perform the delete operation in the database
      await deleteDoc(doc(db, "gratitudeEntries", entryId));

      const updatedEntries = gratitudeEntries.filter(
        (entry) => entry.id !== entryId
      );
      setGratitudeEntries(updatedEntries);
      setSelectedItem(null);
    } catch (error: any) {
      setError(error.message);
      console.error("Error deleting gratitude entry: ", error.message);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <>
      <Link onClick={() => setError(null)} to="/">
        <IoMdArrowRoundBack className="w-5 h-5 md:ml-4 mb-4 md:h-6 md:w-6" />
      </Link>
      <div className="max-w-[600px] mx-auto  md:mt-8 grid">
        <div>
          <h2 className="font-bold">Here is a list of God's faithfulness</h2>
          {loading ? (
            <img
              src={logo}
              className="h-10 md:h-20 animate-bounce absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] "
              alt="spark-logo"
            />
          ) : gratitudeEntries.length === 0 ? (
            <p className="mt-2 text-sm">
              You do not have any gratitude entries yet. Wow, God's faithfulness
              must be overwhelming!{" "}
            </p>
          ) : (
            <ul className="flex flex-col gap-3 md:gap-6 mt-4">
              {gratitudeEntries.map((entry) => (
                <GratitudeCard
                  selectedItem={selectedItem}
                  text={entry.entry}
                  time={entry.timestamp}
                  key={entry.timestamp}
                  setSelectedItem={(item) => setSelectedItem(item)}
                  onDelete={() => handleDeleteEntry(entry.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      {deleting && (
        <Modal bg show={deleting} onClose={() => {}}>
          {" "}
          <Link onClick={() => setError(null)} to="/">
            <img
              src={logo}
              className="h-10 md:h-20 animate-bounce absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] "
              alt="spark-logo"
            />{" "}
          </Link>
        </Modal>
      )}
    </>
  );
};

export default Gratitude;
