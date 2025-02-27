type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  size?: number | string;
};

const Button: React.FC<ButtonProps> = ({ children, className = '', size, ...props }) => {
  return (
    <button
      className={`rounded-full bg-black flex justify-center items-center ${className}`}
      style={{ width: size, height: size }}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
