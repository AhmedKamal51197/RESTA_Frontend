import "../Models.css";

export default function Information() {
  return (
    <div className="Information">
      <div className="content">
        <div className="row">
          <div className="col col-12 col-md-6">
            <b>name</b>
            <span>name</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>discount percentage</b>
            <span>7.00%</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>start date</b>
            <span>12:45 pm 08-03-2001</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>end date</b>
            <span>12:45 pm 08-03-2001</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>status</b>
            <span>
              <span>active</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
