import { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  isDemoConfig 
} from '../firebase/firebase';
import { initialDemoSites } from '../data/demoSites';

const SITES_COLLECTION = 'construction_sites';
const LOCAL_STORAGE_KEY = 'mazdoorlink_sites_v1';

// Initialize local storage seed data if needed
const getLocalSites = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Local sites parse error:", e);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDemoSites));
  return initialDemoSites;
};

const saveLocalSites = (sites) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sites));
};

export const fetchAllSites = async () => {
  if (!isDemoConfig && db) {
    try {
      const q = query(collection(db, SITES_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn("Firestore fetch error, falling back to seed sites:", err.message);
    }
  }
  return getLocalSites();
};

export const createSite = async (siteData, currentUser, userProfile) => {
  const newSite = {
    ...siteData,
    contractorId: currentUser?.uid || 'demo-contractor-1',
    contractorName: userProfile?.fullName || userProfile?.companyName || 'Contractor',
    isFilled: false,
    createdAt: new Date().toISOString()
  };

  if (!isDemoConfig && db) {
    try {
      const docRef = await addDoc(collection(db, SITES_COLLECTION), newSite);
      return { id: docRef.id, ...newSite };
    } catch (err) {
      console.warn("Firestore add site error, using local state:", err.message);
    }
  }

  const localSites = getLocalSites();
  const createdLocalSite = { id: 'site-' + Date.now(), ...newSite };
  const updated = [createdLocalSite, ...localSites];
  saveLocalSites(updated);
  return createdLocalSite;
};

export const updateSiteStatus = async (siteId, isFilled) => {
  if (!isDemoConfig && db) {
    try {
      const docRef = doc(db, SITES_COLLECTION, siteId);
      await updateDoc(docRef, { isFilled });
    } catch (err) {
      console.warn("Firestore update status error:", err.message);
    }
  }

  const localSites = getLocalSites();
  const updated = localSites.map(s => s.id === siteId ? { ...s, isFilled } : s);
  saveLocalSites(updated);
  return updated;
};

export const updateSiteDetails = async (siteId, updatedData) => {
  if (!isDemoConfig && db) {
    try {
      const docRef = doc(db, SITES_COLLECTION, siteId);
      await updateDoc(docRef, updatedData);
    } catch (err) {
      console.warn("Firestore update details error:", err.message);
    }
  }

  const localSites = getLocalSites();
  const updated = localSites.map(s => s.id === siteId ? { ...s, ...updatedData } : s);
  saveLocalSites(updated);
  return updated;
};

export const deleteSite = async (siteId) => {
  if (!isDemoConfig && db) {
    try {
      const docRef = doc(db, SITES_COLLECTION, siteId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("Firestore delete error:", err.message);
    }
  }

  const localSites = getLocalSites();
  const updated = localSites.filter(s => s.id !== siteId);
  saveLocalSites(updated);
  return updated;
};
