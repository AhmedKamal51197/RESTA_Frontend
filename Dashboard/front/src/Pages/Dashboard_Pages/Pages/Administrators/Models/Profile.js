import "../Models.css";

export default function Profile() {
  return (
    <div className="Profile">
      <div className="content">
        <div className="head">
          <div>basic information</div>
        </div>
        <div className="row">
          <div className="col col-12 col-md-6">
            <b>email</b>
            <span className="email">email@gmail.com</span>
          </div>
          <div className="col col-12 col-md-6">
            <b>phone</b>
            <span>1376464643</span>
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
