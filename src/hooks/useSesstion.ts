import { useSessionStore } from "../stores/session.store";

export function useSession() {
  const currentUser = useSessionStore(
    (state) => state.currentUser
  );

  const selectedOrganization = useSessionStore(
    (state) => state.selectedOrganization
  );

  const login = useSessionStore(
    (state) => state.login
  );

  const logout = useSessionStore(
    (state) => state.logout
  );

  const switchUser = useSessionStore(
    (state) => state.switchUser
  );

  const switchOrganization = useSessionStore(
    (state) => state.switchOrganization
  );

  return {
    currentUser,
    selectedOrganization,
    login,
    logout,
    switchUser,
    switchOrganization,
  };
}