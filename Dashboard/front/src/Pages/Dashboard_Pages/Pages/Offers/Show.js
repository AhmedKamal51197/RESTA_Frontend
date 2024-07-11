import "./Offers.css";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import { FaImage, FaInfoCircle } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

import Information from "./Models/Information";
import Images from "./Models/Images";
import Items from "./Models/Items";

export default function Show() {
  return (
    <div className="Show">
      <div className="tabs">
        <Tabs defaultActiveKey="1">
          <TabPane
            className="TabPane"
            tab={
              <span>
                <FaInfoCircle />
                Information
              </span>
            }
            key="1"
          >
            <Information />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FaImage />
                Images
              </span>
            }
            key="2"
          >
            <Images />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FaShoppingBag />
                Items
              </span>
            }
            key="3"
          >
            <Items />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
