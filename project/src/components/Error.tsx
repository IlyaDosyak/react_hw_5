const Error = (props: any) => {
  const { children } = props;
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};

export default Error;
