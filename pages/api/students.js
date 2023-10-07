import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, addDoc, collection } from "firebase/firestore";
import firebase_app from "@/config";

const db = getFirestore(firebase_app);

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "GET") {
    const simulationCollection = collection(db, "students");
    const simulationSnapshot = await getDocs(simulationCollection);
    const simulationList = simulationSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(simulationList);
  } else if (req.method === "POST") {
    const simulation = JSON.parse(JSON.stringify(req.body));
    const newSimulation = {
      name: simulation.name,
      studentClass: simulation.studentClass,
      registerId: simulation.registerId,
      score: simulation.score,
    };

    const simulationCollection = collection(db, "quizes");
    const simulationSnapshot = await addDoc(
      simulationCollection,
      newSimulation
    );

    res.status(200).json({
      message: "success",
    });
  }
};

// import { getFirestore, doc, getDoc } from "firebase/firestore";

// const db = getFirestore(firebase_app);
// export default async function getDoument(collection, id) {
//   let docRef = doc(db, collection, id);

//   let result = null;
//   let error = null;

//   try {
//     result = await getDoc(docRef);
//   } catch (e) {
//     error = e;
//   }

//   return { result, error };
// }
