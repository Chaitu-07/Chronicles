import { Link } from "react-router-dom";

function RelatedLink({ item }) {

  if (!item || !item.slug || !item.type) {
    return null;
  }

  return (
    <Link
      to={`/${item.type.toLowerCase()}/${item.slug}`}
      className="profile-tag related-link"
    >
      {item.title || item.slug}

      <span className="related-arrow">
        →
      </span>
    </Link>
  );
}

export default RelatedLink;