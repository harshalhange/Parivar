import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../firebase';
import { CustomerInfo, UserAddress } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  profile: CustomerInfo | null;
  addresses: UserAddress[];
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfileData: (data: CustomerInfo) => Promise<void>;
  saveAddress: (addr: Omit<UserAddress, 'id'>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<CustomerInfo | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Check admin email or flag
        const isUserAdmin = user.email === 'admin@parivarfurniture.com' || user.email === 'hangeharshal@gmail.com';
        setIsAdmin(isUserAdmin);

        // Subscribe to user doc
        const userRef = doc(db, 'users', user.uid);
        const unsubDoc = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setProfile({
              name: data.name || user.displayName || 'Customer',
              phone: data.phone || '',
              email: data.email || user.email || '',
              address: data.address || '',
              city: data.city || '',
              pincode: data.pincode || ''
            });
            if (data.addresses && Array.isArray(data.addresses)) {
              setAddresses(data.addresses);
            }
          } else {
            // Create default initial profile
            const initialProf: CustomerInfo = {
              name: user.displayName || 'Customer',
              phone: '',
              email: user.email || '',
              address: '',
              city: '',
              pincode: ''
            };
            setDoc(userRef, {
              ...initialProf,
              uid: user.uid,
              createdAt: Date.now(),
              addresses: []
            }).catch(err => console.error('Failed to create user doc', err));
            setProfile(initialProf);
          }
        }, (err) => {
          console.warn('User doc snapshot warning:', err.message);
        });

        setLoading(false);
        return () => unsubDoc();
      } else {
        setProfile(null);
        setAddresses([]);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Guest Sign-In Error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const updateProfileData = async (data: CustomerInfo) => {
    if (!currentUser) return;
    const path = `users/${currentUser.uid}`;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        ...data,
        uid: currentUser.uid,
        updatedAt: Date.now()
      }, { merge: true });
      setProfile(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const saveAddress = async (newAddr: Omit<UserAddress, 'id'>) => {
    if (!currentUser) return;
    const id = 'addr_' + Date.now();
    const addressObj: UserAddress = { ...newAddr, id };
    
    let updatedList = [...addresses];
    if (addressObj.default) {
      updatedList = updatedList.map(a => ({ ...a, default: false }));
    }
    updatedList.unshift(addressObj);

    const path = `users/${currentUser.uid}`;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        addresses: updatedList
      }, { merge: true });
      setAddresses(updatedList);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!currentUser) return;
    const updatedList = addresses.filter(a => a.id !== id);
    const path = `users/${currentUser.uid}`;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        addresses: updatedList
      }, { merge: true });
      setAddresses(updatedList);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!currentUser) return;
    const updatedList = addresses.map(a => ({ ...a, default: a.id === id }));
    const path = `users/${currentUser.uid}`;
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        addresses: updatedList
      }, { merge: true });
      setAddresses(updatedList);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      profile,
      addresses,
      isAdmin,
      loginWithGoogle,
      loginAsGuest,
      logout,
      updateProfileData,
      saveAddress,
      deleteAddress,
      setDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
