interface detailItemPropsInterface {
  title: string;
  value: string;
  href?: string;
}

function DetailItem({ title, value, href }: detailItemPropsInterface) {
  return (
    <div className={"datail-item"}>
      <div className="detail-item-title">{title}</div>
      {href ? (
        <div className="detail-item-value">
          <a href={"http://" + href} target="_blank">
            {value}
          </a>
        </div>
      ) : (
        <div className="detail-item-value">{value}</div>
      )}
    </div>
  );
}

export default DetailItem;
