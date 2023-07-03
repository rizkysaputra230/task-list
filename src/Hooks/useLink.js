export const useLink = () => {
  const push = (path) => {
    window.location.href = path;
  };

  return { push };
};

export default useLink;
