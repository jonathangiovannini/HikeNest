export const useAuth = (): string | null => {
  const context = localStorage.getItem("userId");
  return context;
};
