import { useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { DEFAULT_PROFILE } from "../constants";

const uid = () => Math.random().toString(36).slice(2, 9);

export function useProfiles(user) {
  const [profiles,        setProfiles]        = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [loading,         setLoading]         = useState(true);

  useEffect(() => {
    if (!user) {
      setProfiles([]);
      setActiveProfileId(null);
      setLoading(false);
      return;
    }

    const profilesRef = collection(db, "users", user.uid, "profiles");

    // Real-time listener — updates instantly on any device
    const unsubscribe = onSnapshot(profilesRef, (snapshot) => {
      const loaded = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      if (loaded.length === 0) {
        // First time user — create a default profile
        const defaultId = uid();
        const defaultProfile = {
          id:   defaultId,
          name: "Software Engineer",
          ...DEFAULT_PROFILE,
        };
        saveProfileToFirestore(user.uid, defaultProfile);
        setProfiles([defaultProfile]);
        setActiveProfileId(defaultId);
      } else {
        setProfiles(loaded);
        // Restore last active profile
        loadActiveProfileId(user.uid, loaded);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const loadActiveProfileId = async (uid, loadedProfiles) => {
    try {
      const metaRef = doc(db, "users", uid, "meta", "activeProfile");
      const snap    = await getDoc(metaRef);
      if (snap.exists()) {
        const savedId = snap.data().profileId;
        // Make sure it still exists
        const stillExists = loadedProfiles.find((p) => p.id === savedId);
        setActiveProfileId(stillExists ? savedId : loadedProfiles[0].id);
      } else {
        setActiveProfileId(loadedProfiles[0].id);
      }
    } catch {
      setActiveProfileId(loadedProfiles[0]?.id || null);
    }
  };

  const saveProfileToFirestore = async (userId, profile) => {
    const ref = doc(db, "users", userId, "profiles", profile.id);
    await setDoc(ref, profile);
  };

  const saveActiveProfileId = async (userId, profileId) => {
    const ref = doc(db, "users", userId, "meta", "activeProfile");
    await setDoc(ref, { profileId });
  };

  const handleProfileChange = (field, value) => {
    const updated = profiles.map((p) =>
      p.id === activeProfileId ? { ...p, [field]: value } : p
    );
    setProfiles(updated);

    const activeProfile = updated.find((p) => p.id === activeProfileId);
    if (activeProfile && user) {
      saveProfileToFirestore(user.uid, activeProfile);
    }
  };

  const handleSwitchProfile = (id) => {
    setActiveProfileId(id);
    if (user) saveActiveProfileId(user.uid, id);
  };

  const handleAddProfile = (roleName) => {
    const newProfile = { id: uid(), name: roleName, ...DEFAULT_PROFILE };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    if (user) {
      saveProfileToFirestore(user.uid, newProfile);
      saveActiveProfileId(user.uid, newProfile.id);
    }
  };

  const handleDeleteProfile = (id) => {
    if (profiles.length <= 1) return;
    const remaining = profiles.filter((p) => p.id !== id);
    setProfiles(remaining);
    if (user) {
      deleteDoc(doc(db, "users", user.uid, "profiles", id));
    }
    if (activeProfileId === id) {
      const newActive = remaining[0].id;
      setActiveProfileId(newActive);
      if (user) saveActiveProfileId(user.uid, newActive);
    }
  };

  const handleRenameProfile = (id, newName) => {
    const updated = profiles.map((p) => (p.id === id ? { ...p, name: newName } : p));
    setProfiles(updated);
    if (user) {
      const renamed = updated.find((p) => p.id === id);
      saveProfileToFirestore(user.uid, renamed);
    }
  };

  return {
    profiles,
    activeProfileId,
    loading,
    handleProfileChange,
    handleSwitchProfile,
    handleAddProfile,
    handleDeleteProfile,
    handleRenameProfile,
  };
}
