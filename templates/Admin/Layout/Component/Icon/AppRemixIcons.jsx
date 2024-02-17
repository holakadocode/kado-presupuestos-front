export default function AppRemixIcons(props) {
  const { title, icon, color, className, size } = props;

  return (
    <span
      title={title}
      className={className}
      style={{
        fontSize: size,
        color: color,
      }}
    >
      <i className={icon}></i>
    </span>
  );
}
