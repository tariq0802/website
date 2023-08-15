interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="z-10 w-full max-w-5xl mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
      {children}
    </div>
  );
};
export default Container;
