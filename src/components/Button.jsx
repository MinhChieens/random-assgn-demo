const Button = ({ className, href, children, onClick }) => {
  const classes = `relative block inline-flex items-center justify-center transition-colors text-darkblue/80 hover:text-darkblue ${className || ""}`;
  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default Button;
