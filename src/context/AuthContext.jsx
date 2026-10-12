import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  doc, 
  setDoc, 
  getDoc,
  isDemoConfig
} from '../firebase/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state (Firebase or localStorage fallback for demo mode)
  useEffect(() => {
    let unsubscribe = () => {};

    if (!isDemoConfig && auth) {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          // Fetch extra profile data from Firestore
          try {
            const userDocRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
              setUserProfile(userSnap.data());
            } else {
              setUserProfile({ uid: user.uid, email: user.email, role: 'mazdoor' });
            }
          } catch (err) {
            console.error("Firestore user fetch error:", err);
          }
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      });
    } else {
      // Demo / Fallback mode
      const savedUser = localStorage.getItem('mazdoorlink_demo_user');
      const savedProfile = localStorage.getItem('mazdoorlink_demo_profile');
      if (savedUser && savedProfile) {
        setCurrentUser(JSON.parse(savedUser));
        setUserProfile(JSON.parse(savedProfile));
      }
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  // Sign Up function
  const signup = async (email, password, extraData) => {
    const { fullName, phone, city, role, skill, companyName } = extraData;

    if (!isDemoConfig && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      
      const profileData = {
        uid: user.uid,
        email,
        fullName: fullName || '',
        phone: phone || '',
        city: city || 'Lahore',
        role: role || 'mazdoor', // 'mazdoor' or 'contractor'
        skill: skill || 'mazdoor',
        experienceYears: 2,
        availability: 'available',
        companyName: companyName || '',
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', user.uid), profileData);
      } catch (err) {
        console.error("Error setting user doc in Firestore:", err);
      }

      setUserProfile(profileData);
      return user;
    } else {
      // Demo signup
      const mockUser = { uid: 'demo-user-' + Date.now(), email };
      const profileData = {
        uid: mockUser.uid,
        email,
        fullName: fullName || 'Demo User',
        phone: phone || '03001234567',
        city: city || 'Lahore',
        role: role || 'mazdoor',
        skill: skill || 'mazdoor',
        experienceYears: 2,
        availability: 'available',
        companyName: companyName || 'Demo Construction Co.',
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('mazdoorlink_demo_user', JSON.stringify(mockUser));
      localStorage.setItem('mazdoorlink_demo_profile', JSON.stringify(profileData));
      setCurrentUser(mockUser);
      setUserProfile(profileData);
      return mockUser;
    }
  };

  // Login function
  const login = async (email, password) => {
    if (!isDemoConfig && auth) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      if (userSnap.exists()) {
        setUserProfile(userSnap.data());
      }
      return user;
    } else {
      // Demo login
      const mockUser = { uid: 'demo-user-123', email };
      // Check if previously registered profile exists
      let profileData = JSON.parse(localStorage.getItem('mazdoorlink_demo_profile'));
      if (!profileData) {
        profileData = {
          uid: mockUser.uid,
          email,
          fullName: email.split('@')[0],
          phone: '03001234567',
          city: 'Lahore',
          role: email.includes('contractor') ? 'contractor' : 'mazdoor',
          skill: 'mistri',
          experienceYears: 3,
          availability: 'available',
          companyName: 'Bismillah Construction',
          createdAt: new Date().toISOString()
        };
      }
      localStorage.setItem('mazdoorlink_demo_user', JSON.stringify(mockUser));
      localStorage.setItem('mazdoorlink_demo_profile', JSON.stringify(profileData));
      setCurrentUser(mockUser);
      setUserProfile(profileData);
      return mockUser;
    }
  };

  // Quick Demo Login helper (for testing convenience)
  const quickDemoLogin = (role = 'mazdoor') => {
    const mockUser = { uid: `demo-${role}-123`, email: `${role}@mazdoorlink.pk` };
    const profileData = {
      uid: mockUser.uid,
      email: mockUser.email,
      fullName: role === 'contractor' ? 'Chaudhry Ahmad (ٹھیکیدار)' : 'Kashif Ali (کاریگر/مزدور)',
      phone: '03001234567',
      city: 'Lahore',
      role: role,
      skill: 'mistri',
      experienceYears: 4,
      availability: 'available',
      companyName: role === 'contractor' ? 'Chaudhry Construction Co.' : '',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('mazdoorlink_demo_user', JSON.stringify(mockUser));
    localStorage.setItem('mazdoorlink_demo_profile', JSON.stringify(profileData));
    setCurrentUser(mockUser);
    setUserProfile(profileData);
  };

  // Logout function
  const logout = async () => {
    if (!isDemoConfig && auth) {
      await signOut(auth);
    }
    localStorage.removeItem('mazdoorlink_demo_user');
    localStorage.removeItem('mazdoorlink_demo_profile');
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Reset password
  const resetPassword = async (email) => {
    if (!isDemoConfig && auth) {
      await sendPasswordResetEmail(auth, email);
    }
    return true;
  };

  // Update profile
  const updateProfileData = async (updatedFields) => {
    const newProfile = { ...userProfile, ...updatedFields };
    if (!isDemoConfig && auth && currentUser) {
      await setDoc(doc(db, 'users', currentUser.uid), newProfile, { merge: true });
    } else {
      localStorage.setItem('mazdoorlink_demo_profile', JSON.stringify(newProfile));
    }
    setUserProfile(newProfile);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      userProfile,
      loading,
      signup,
      login,
      quickDemoLogin,
      logout,
      resetPassword,
      updateProfileData
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
