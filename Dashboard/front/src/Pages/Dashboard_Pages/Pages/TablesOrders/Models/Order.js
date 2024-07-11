import "../Models.css";

export default function Order() {
  return (
    <div className="Order">
      <div className="content">
        <div className="head">
          <div className="id">
            <label>order id:</label>
            <b>#4643153</b>
            <span>unpaid</span>
            <span>accept</span>
          </div>
          <div className="date">
            <span>07:45 am 29-04-2001</span>
          </div>
          <div className="payment_type">
            <label>payment type:</label>
            <b>cash/card</b>
          </div>
          <div className="order_type">
            <label>order type:</label>
            <b>dining table</b>
          </div>
          <div className="delivery_time">
            <label>delivery time:</label>
            <b>07:45 am 29-04-2001</b>
          </div>
          <div className="table_id">
            <label>table id:</label>
            <b>table 1</b>
          </div>
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
