function Button({ children, className = '', as: Component = 'button', ...props }) {
  return (
    <Component className={`button ${className}`.trim()} {...props}>
      <span>{children}</span>
    </Component>
  );
}

export default Button;
