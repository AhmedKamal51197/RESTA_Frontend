import "./Customers.css";
import profileImage from "../../../../assets/global/profile.png";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import Profile from "./Models/Profile";
import Security from "./Models/Security";
import Address from "./Models/Address";
import MyOrders from "./Models/MyOrders";

export default function Show() {
  return (
    <div className="Show">
      <div className="row">
        <div className="image">
          <img src={profileImage} alt="profile image" />
        </div>

        <div className="details">
          <h3>will smith</h3>
          <p className="typeRole">customer</p>

          <form>
            <input type="file" name="image" id="image" />
            <label for="image" className="btn btn-primary">
              upload new photo
            </label>
          </form>
        </div>
      </div>

      <div className="tabs">
        <Tabs defaultActiveKey="1">
          <TabPane
            className="TabPane"
            tab={
              <span>
                <UserOutlined />
                profile
              </span>
            }
            key="1"
          >
            <Profile />
          </TabPane>
          <TabPane
            tab={
              <span>
                <LockFilled />
                security
              </span>
            }
            key="2"
          >
            <Security />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FaLocationDot />
                address
              </span>
            }
            key="3"
          >
            <Address />
          </TabPane>
          <TabPane
            tab={
              <span>
                <IoMdNotifications />
                my orders
              </span>
            }
            key="4"
          >
            <MyOrders />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
