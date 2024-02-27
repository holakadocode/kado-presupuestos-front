export default function AppRemixIcons(props) {
  const { title, icon, color, size, className } = props;

  return (
    <span
      title={title}
      style={{
        fontSize: size,
        color: color,
      }}
      className={className}
    >
      <i className={icon}></i>
    </span>
  );
}
