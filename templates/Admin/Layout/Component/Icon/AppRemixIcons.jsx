export default function AppRemixIcons(props) {
  const { title, icon, color, size } = props;

  return (
    <span
      title={title}
      style={{
        fontSize: size,
        color: color,
      }}
    >
      <i className={icon}></i>
    </span>
  );
}
