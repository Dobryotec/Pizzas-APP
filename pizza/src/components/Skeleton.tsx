import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="120" r="118" />
    <rect x="82" y="272" rx="0" ry="0" width="0" height="1" />
    <rect x="0" y="245" rx="10" ry="10" width="280" height="18" />
    <rect x="0" y="282" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="392" rx="10" ry="10" width="90" height="30" />
    <rect x="130" y="384" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
